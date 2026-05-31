import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ROUTER_NAME_SPACES } from "@/app/router";
import type { NavigationProp } from "@/app/router/types";
import { normalizeApiError } from "@/shared/api/errors";
import { Button } from "@/shared/ui";
import useImagePicker from "@/shared/lib/useImagePicker";
import MapMarkerIcon from "../../../../assets/icons/map-marker.svg";
import useAddProfilePhoto from "../model/hooks/useAddProfilePhoto";
import useDeleteProfilePhoto from "../model/hooks/useDeleteProfilePhoto";
import useMyProfile from "../model/hooks/useMyProfile";
import useProfilePhotoDrag from "../model/hooks/useProfilePhotoDrag";
import useReorderProfilePhotos from "../model/hooks/useReorderProfilePhotos";
import useSetMainProfilePhoto from "../model/hooks/useSetMainProfilePhoto";
import {
  getMainProfilePhoto,
  getPhotoUri,
  getProfilePhotos,
} from "../model/lib/profilePhotos";
import {
  getBirthDateLabel,
  getCommunicationStyleLabel,
  getGenderLabel,
  getLocationLabel,
  getMeetingGoalLabel,
  getProfileErrorText,
  getTextValue,
} from "../model/lib/profileLabels";
import { PROFILE_PHOTO_SLOTS_COUNT } from "../model/lib/profilePhotoDrag";
import ProfilePhotosGrid from "./ProfilePhotosGrid";
import ProfileSection from "./ProfileSection";
import VerifiedBadge from "./VerifiedBadge";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { profile, isLoading, isError, error, refetch } = useMyProfile();
  const addPhotoMutation = useAddProfilePhoto();
  const deletePhotoMutation = useDeleteProfilePhoto();
  const reorderPhotosMutation = useReorderProfilePhotos();
  const setMainPhotoMutation = useSetMainProfilePhoto();
  const {
    image,
    loading: galleryLoading,
    pickImage,
    clearImage,
  } = useImagePicker(["images"]);
  const uploadingPhotoUriRef = useRef<string | null>(null);
  const photos = getProfilePhotos(profile?.photos);
  const mainPhoto = getMainProfilePhoto(photos);
  const mainPhotoUri = getPhotoUri(mainPhoto);
  const deletingPhotoId = deletePhotoMutation.isPending
    ? deletePhotoMutation.variables
    : null;
  const isPhotoActionPending =
    addPhotoMutation.isPending ||
    deletePhotoMutation.isPending ||
    reorderPhotosMutation.isPending ||
    setMainPhotoMutation.isPending;
  const canAddPhoto = photos.length < PROFILE_PHOTO_SLOTS_COUNT;
  const profileName = getTextValue(profile?.name, "Имя не указано");
  const profileAge =
    typeof profile?.age === "number" && profile.age > 0
      ? `, ${profile.age}`
      : "";
  const expectations = getTextValue(
    profile?.expectations,
    "Расскажите, чего вы ждете от встреч, чтобы людям было проще понять вас.",
  );
  const profileStatuses = [
    profile?.isProfileCompleted ? "Профиль заполнен" : "Профиль не заполнен",
    profile?.onboardingCompleted ? "Онбординг завершен" : "Онбординг не завершен",
  ];

  const handlePhotoOrderChange = (
    nextPhotoIds: string[],
    nextMainPhotoId?: string,
  ) => {
    reorderPhotosMutation.mutate(
      nextPhotoIds,
      {
        onError: (reorderError) => {
          Alert.alert(
            "Не удалось изменить порядок фото",
            normalizeApiError(reorderError).message,
          );
        },
        onSuccess: () => {
          if (!nextMainPhotoId) {
            return;
          }

          setMainPhotoMutation.mutate(nextMainPhotoId, {
            onError: (setMainError) => {
              Alert.alert(
                "Не удалось выбрать главное фото",
                normalizeApiError(setMainError).message,
              );
            },
          });
        },
      },
    );
  };

  const photoDrag = useProfilePhotoDrag({
    disabled: isPhotoActionPending,
    onOrderChange: handlePhotoOrderChange,
    photos,
  });

  useEffect(() => {
    if (image && photos.length >= PROFILE_PHOTO_SLOTS_COUNT) {
      clearImage();
      return;
    }

    if (
      !image ||
      addPhotoMutation.isPending ||
      uploadingPhotoUriRef.current === image
    ) {
      return;
    }

    uploadingPhotoUriRef.current = image;
    addPhotoMutation.mutate(
      {
        photoUri: image,
        position: photos.length + 1,
      },
      {
        onError: (addError) => {
          Alert.alert(
            "Не удалось добавить фото",
            normalizeApiError(addError).message,
          );
        },
        onSettled: () => {
          uploadingPhotoUriRef.current = null;
          clearImage();
        },
      },
    );
  }, [addPhotoMutation, clearImage, image, photos.length]);

  const handleAddPhoto = () => {
    if (!canAddPhoto || isPhotoActionPending || galleryLoading) {
      return;
    }

    void pickImage();
  };

  const handleDeletePhoto = (photoId: string) => {
    Alert.alert("Удалить фото?", "Фото исчезнет из профиля.", [
      {
        text: "Отмена",
        style: "cancel",
      },
      {
        text: "Удалить",
        style: "destructive",
        onPress: () => {
          deletePhotoMutation.mutate(photoId, {
            onError: (deleteError) => {
              Alert.alert(
                "Не удалось удалить фото",
                normalizeApiError(deleteError).message,
              );
            },
          });
        },
      },
    ]);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Pressable
        style={styles.headerAction}
        hitSlop={12}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.headerActionText}>‹</Text>
      </Pressable>
      <Text style={styles.headerTitle}>Мой профиль</Text>
      <Pressable
        style={styles.headerAction}
        hitSlop={12}
        accessibilityRole="button"
        onPress={() => navigation.navigate(ROUTER_NAME_SPACES.SETTINGS.NAME)}
      >
        <Text style={styles.moreIcon}>•••</Text>
      </Pressable>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            styles.stateContent,
            {
              paddingTop: insets.top + 12,
              paddingBottom: insets.bottom + 28,
            },
          ]}
        >
          {renderHeader()}
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color="#30323E" />
            <Text style={styles.stateText}>Загружаем профиль</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (isError || !profile) {
    return (
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            styles.stateContent,
            {
              paddingTop: insets.top + 12,
              paddingBottom: insets.bottom + 28,
            },
          ]}
        >
          {renderHeader()}
          <View style={styles.centerState}>
            <Text style={styles.stateTitle}>Не удалось загрузить профиль</Text>
            <Text style={styles.stateText}>
              {isError
                ? getProfileErrorText(error)
                : "Ответ профиля пустой. Попробуйте еще раз."}
            </Text>
            <Button
              title="Повторить"
              type="secondary"
              size="lg"
              onPress={() => void refetch()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        onScroll={photoDrag.updatePhotoGridLayout}
        scrollEventThrottle={16}
        scrollEnabled={!photoDrag.dragState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 28,
          },
        ]}
      >
        {renderHeader()}

        <View style={styles.heroCard}>
          <View style={styles.heroRow}>
            <View style={styles.avatar}>
              {mainPhotoUri ? (
                <Image source={{ uri: mainPhotoUri }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarInitial}>{profileName[0]}</Text>
              )}
            </View>
            <View style={styles.heroInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.nameText}>
                  {profileName}
                  {profileAge}
                </Text>
                {profile.isProfileCompleted ? <VerifiedBadge /> : null}
              </View>
              <View style={styles.locationChip}>
                <MapMarkerIcon width={14} height={14} color="#7E8191" />
                <Text style={styles.locationText}>
                  {getLocationLabel(profile.city)}
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.heroDescription}>{expectations}</Text>
        </View>

        <ProfilePhotosGrid
          canAddPhoto={canAddPhoto}
          deletingPhotoId={deletingPhotoId}
          drag={photoDrag}
          galleryLoading={galleryLoading}
          isAddingPhoto={addPhotoMutation.isPending}
          isPhotoActionPending={isPhotoActionPending}
          onAddPhoto={handleAddPhoto}
          onDeletePhoto={handleDeletePhoto}
          photos={photos}
        />

        <View style={styles.verificationCard}>
          <Text style={styles.verificationTitle}>Статус профиля</Text>
          <Text style={styles.verificationText}>
            Чем полнее заполнен профиль, тем проще другим пользователям понять,
            подходит ли им встреча с вами.
          </Text>
          <View style={styles.providersRow}>
            {profileStatuses.map((status) => (
              <View key={status} style={styles.providerButton}>
                <Text style={styles.providerButtonText}>{status}</Text>
              </View>
            ))}
          </View>
        </View>

        <ProfileSection
          title="Цель встречи"
          value={getMeetingGoalLabel(profile.meetingGoal)}
          editable
        />
        <ProfileSection
          title="Стиль общения"
          value={getCommunicationStyleLabel(profile.communicationStyle)}
          editable
        />
        <ProfileSection title="Ожидания" value={expectations} editable />
        <ProfileSection
          title="Интересы"
          chips={profile.interests?.map((interest) => interest.name) ?? []}
          emptyText="Интересы не выбраны"
          editable
        />
        <ProfileSection
          title="Дата рождения"
          value={getBirthDateLabel(profile.birthDate)}
        />
        <ProfileSection title="Пол" value={getGenderLabel(profile.gender)} />
        <ProfileSection
          title="Телефон"
          value={getTextValue(profile.phoneNumber)}
        />

        <View style={styles.saveButtonWrap}>
          <Button
            title="Сохранить"
            type="secondary"
            size="lg"
            fullWidth
            onPress={() => undefined}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F5F6F8",
    overflow: "visible",
  },
  content: {
    gap: 16,
    overflow: "visible",
  },
  stateContent: {
    flexGrow: 1,
  },
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingHorizontal: 24,
  },
  stateTitle: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
    color: "#30323E",
    textAlign: "center",
  },
  stateText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#7E8191",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700",
    color: "#111111",
  },
  headerAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerActionText: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "700",
    color: "#30323E",
  },
  moreIcon: {
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 1.2,
    fontWeight: "700",
    color: "#30323E",
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 20,
    gap: 16,
  },
  heroRow: {
    flexDirection: "row",
    gap: 14,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#30323E",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarInitial: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  heroInfo: {
    flex: 1,
    justifyContent: "center",
    gap: 10,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  nameText: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    color: "#30323E",
  },
  locationChip: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    backgroundColor: "#EEF0FA",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  locationText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "600",
    color: "#7E8191",
  },
  heroDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: "#3E4055",
  },
  verificationCard: {
    borderRadius: 28,
    backgroundColor: "#30323E",
    padding: 20,
    gap: 14,
    marginHorizontal: 16,
  },
  verificationTitle: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  verificationText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#D6D8E3",
  },
  providersRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  providerButton: {
    minWidth: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  providerButtonText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "700",
    color: "#30323E",
  },
  saveButtonWrap: {
    paddingHorizontal: 16,
  },
});

export default ProfileScreen;
