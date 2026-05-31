import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CloseIcon from "../../../../assets/icons/material-symbols_close-rounded.svg";
import type { ProfilePhotoDragController } from "../model/hooks/useProfilePhotoDrag";
import { getPhotoUri } from "../model/lib/profilePhotos";
import {
  getPhotoTileSlots,
  PROFILE_PHOTO_GRID_COLUMNS,
  PROFILE_PHOTO_TILE_HORIZONTAL_GAP,
  PROFILE_PHOTO_TILE_VERTICAL_GAP,
  type PhotoDragState,
} from "../model/lib/profilePhotoDrag";
import type { UserProfilePhoto } from "../model/types";
import ProfileCard from "./ProfileCard";

type ProfilePhotosGridProps = {
  canAddPhoto: boolean;
  deletingPhotoId?: string | null;
  drag: ProfilePhotoDragController;
  galleryLoading: boolean;
  isAddingPhoto: boolean;
  isPhotoActionPending: boolean;
  onAddPhoto: () => void;
  onDeletePhoto: (photoId: string) => void;
  photos: UserProfilePhoto[];
};

const ProfilePhotosGrid = ({
  canAddPhoto,
  deletingPhotoId,
  drag,
  galleryLoading,
  isAddingPhoto,
  isPhotoActionPending,
  onAddPhoto,
  onDeletePhoto,
  photos,
}: ProfilePhotosGridProps) => {
  const {
    displayedPhotos,
    draggedPhoto,
    dragState,
    handlePhotoCellLayout,
    photoCellLayout,
    photoGridPanHandlers,
    photoGridRef,
    updatePhotoGridLayout,
  } = drag;
  const draggedPhotoUri = getPhotoUri(draggedPhoto);
  const photoTileSlots = getPhotoTileSlots({
    canAddPhoto,
    isDragging: Boolean(dragState),
    photoCount: displayedPhotos.length,
  });
  const dragOverlaySize = Math.max(
    photoCellLayout.width - PROFILE_PHOTO_TILE_HORIZONTAL_GAP * 2,
    0,
  );
  const dragOverlayStyle =
    dragState && dragOverlaySize > 0
      ? {
          height: dragOverlaySize,
          left:
            (dragState.sourceIndex % PROFILE_PHOTO_GRID_COLUMNS) *
              photoCellLayout.width +
            PROFILE_PHOTO_TILE_HORIZONTAL_GAP,
          top:
            Math.floor(dragState.sourceIndex / PROFILE_PHOTO_GRID_COLUMNS) *
            (photoCellLayout.height + PROFILE_PHOTO_TILE_VERTICAL_GAP),
          transform: [
            { translateX: dragState.offsetX },
            { translateY: dragState.offsetY },
            { scale: 1.04 },
          ],
          width: dragOverlaySize,
        }
      : null;

  return (
    <ProfileCard>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Мои фото</Text>
        <Text style={styles.sectionHint}>Добавьте до 6 фотографий</Text>
      </View>
      <View
        ref={photoGridRef}
        onLayout={updatePhotoGridLayout}
        style={styles.photosGrid}
        {...photoGridPanHandlers}
      >
        {photoTileSlots.map((slot) => {
          const photo = displayedPhotos[slot];
          const photoUri = getPhotoUri(photo);

          return (
            <ProfilePhotoTile
              key={photo?.id ?? slot}
              canAddPhoto={canAddPhoto}
              deletingPhotoId={deletingPhotoId}
              dragState={dragState}
              galleryLoading={galleryLoading}
              isAddingPhoto={isAddingPhoto}
              isAddSlot={slot === photos.length}
              isPhotoActionPending={isPhotoActionPending}
              onAddPhoto={onAddPhoto}
              onDeletePhoto={onDeletePhoto}
              onPhotoCellLayout={handlePhotoCellLayout}
              photo={photo}
              photoUri={photoUri}
            />
          );
        })}
        {dragOverlayStyle && draggedPhoto && draggedPhotoUri ? (
          <View
            pointerEvents="none"
            style={[styles.photoDragOverlay, dragOverlayStyle]}
          >
            <Image source={{ uri: draggedPhotoUri }} style={styles.photo} />
            {draggedPhoto.isMain ? (
              <View style={styles.primaryPhotoBadge}>
                <Text style={styles.primaryPhotoText}>Основное</Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    </ProfileCard>
  );
};

const ProfilePhotoTile = ({
  canAddPhoto,
  deletingPhotoId,
  dragState,
  galleryLoading,
  isAddingPhoto,
  isAddSlot,
  isPhotoActionPending,
  onAddPhoto,
  onDeletePhoto,
  onPhotoCellLayout,
  photo,
  photoUri,
}: {
  canAddPhoto: boolean;
  deletingPhotoId?: string | null;
  dragState: PhotoDragState | null;
  galleryLoading: boolean;
  isAddingPhoto: boolean;
  isAddSlot: boolean;
  isPhotoActionPending: boolean;
  onAddPhoto: () => void;
  onDeletePhoto: (photoId: string) => void;
  onPhotoCellLayout: (width: number, height: number) => void;
  photo?: UserProfilePhoto;
  photoUri?: string;
}) => {
  const isCurrentDragging = Boolean(photo && dragState?.photoId === photo.id);
  const shouldShowAddLoading = isAddingPhoto && !photo && isAddSlot;
  const shouldShowAddButton = !photo && canAddPhoto;

  return (
    <View
      onLayout={(event) => {
        const { height, width } = event.nativeEvent.layout;
        onPhotoCellLayout(width, height);
      }}
      style={[
        styles.photoTileWrap,
        isCurrentDragging ? styles.photoTileWrapHidden : null,
      ]}
    >
      <View style={styles.photoTile}>
        {photo && photoUri ? (
          <>
            <View
              accessibilityRole="button"
              accessibilityLabel="Перетащить фото"
              style={styles.photoDragSurface}
            >
              <Image source={{ uri: photoUri }} style={styles.photo} />
              {photo.isMain ? (
                <View style={styles.primaryPhotoBadge}>
                  <Text style={styles.primaryPhotoText}>Основное</Text>
                </View>
              ) : null}
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Удалить фото"
              disabled={isPhotoActionPending}
              hitSlop={8}
              onPress={() => onDeletePhoto(photo.id)}
              style={[
                styles.photoDeleteButton,
                isPhotoActionPending ? styles.photoActionDisabled : null,
              ]}
            >
              {deletingPhotoId === photo.id ? (
                <ActivityIndicator size="small" color="#30323E" />
              ) : (
                <CloseIcon width={16} height={16} />
              )}
            </Pressable>
          </>
        ) : shouldShowAddButton ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Добавить фото"
            disabled={isPhotoActionPending || galleryLoading}
            onPress={onAddPhoto}
            style={styles.photoAddButton}
          >
            {shouldShowAddLoading || galleryLoading ? (
              <ActivityIndicator size="small" color="#7E8191" />
            ) : (
              <Text style={styles.photoAddIcon}>+</Text>
            )}
          </Pressable>
        ) : (
          <Text style={styles.photoAddIcon}>+</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
    color: "#30323E",
  },
  sectionHint: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "#7E8191",
  },
  photosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -PROFILE_PHOTO_TILE_HORIZONTAL_GAP,
    marginBottom: -PROFILE_PHOTO_TILE_VERTICAL_GAP,
    overflow: "visible",
    position: "relative",
  },
  photoTileWrap: {
    width: "33.333%",
    paddingHorizontal: PROFILE_PHOTO_TILE_HORIZONTAL_GAP,
    marginBottom: PROFILE_PHOTO_TILE_VERTICAL_GAP,
    position: "relative",
  },
  photoTileWrapHidden: {
    opacity: 0,
  },
  photoDragOverlay: {
    position: "absolute",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#EEF0FA",
    zIndex: 20,
    elevation: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  photoTile: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#EEF0FA",
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  photoDragSurface: {
    width: "100%",
    height: "100%",
  },
  primaryPhotoBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  primaryPhotoText: {
    fontSize: 11,
    lineHeight: 12,
    fontWeight: "700",
    color: "#3B3D4B",
  },
  photoDeleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  photoActionDisabled: {
    opacity: 0.7,
  },
  photoAddButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  photoAddIcon: {
    fontSize: 34,
    lineHeight: 34,
    color: "#7E8191",
    fontWeight: "300",
  },
});

export default ProfilePhotosGrid;
