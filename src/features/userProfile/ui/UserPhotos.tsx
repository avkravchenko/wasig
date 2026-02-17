import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Button } from "@/shared/ui";
import commonStyles from "@/shared/styles";
import { MARGIN_BOTTOM } from "@/shared/constants";
import usePhotos from "@/features/userProfile/model/hooks/usePhotos";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PADDING_HORIZONTAL = 16;
const GAP = 12;
const PHOTO_SIZE = Math.floor(
  (SCREEN_WIDTH - PADDING_HORIZONTAL * 2 - GAP) / 2
);

const UserPhotos = ({ onNextStep }: { onNextStep: () => void }) => {
  const {
    photos,
    loading,
    galleryLoading,
    canAddMore,
    remainingSlots,
    submitPhotos,
    selectPhotos,
    removePhoto,
  } = usePhotos(onNextStep);

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <Text style={commonStyles.titleText}>Добавь несколько фото</Text>
        <Text style={styles.subtitleText}>
          {remainingSlots > 0
            ? `Можно добавить еще ${remainingSlots} фото`
            : "Максимум фото добавлено"}
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.photosGrid}>
            {canAddMore && (
              <TouchableOpacity
                style={[styles.photoBox, styles.photoPlaceholder]}
                onPress={selectPhotos}
              >
                {galleryLoading ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <Text style={styles.plusText}>+</Text>
                )}
              </TouchableOpacity>
            )}

            {photos.map((photoUri, index) => {
              return (
                <View key={photoUri} style={[styles.photoBox]}>
                  <Image source={{ uri: photoUri }} style={styles.photo} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removePhoto(photoUri)}
                  >
                    <Text style={styles.removePhotoText}>+</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={submitPhotos}
          size="lg"
          title="Далее"
          disabled={photos.length === 0 || loading}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  subtitleText: {
    fontSize: 14,
    textAlign: "center",
    color: "#6B7280",
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 0,
  },
  photosGrid: {
    minWidth: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    columnGap: GAP,
  },
  photoBox: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    marginBottom: GAP,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  photoPlaceholder: {
    backgroundColor: "#F3F5F7",
    justifyContent: "center",
    alignItems: "center",
  },
  plusText: {
    fontSize: 32,
    fontWeight: "300",
    color: "#9CA3AF",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  removePhotoText: {
    color: "#FFFFFF",
    fontSize: 20,
    transform: [{ rotate: "45deg" }],
  },
  buttonContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: MARGIN_BOTTOM,
  },
});

export default UserPhotos;
