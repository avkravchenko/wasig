import { Fragment } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
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
import PencilIcon from "../../../../assets/icons/pencil.svg";
import MapMarkerIcon from "../../../../assets/icons/map-marker.svg";
import useMyProfile from "../model/hooks/useMyProfile";
import type { UserProfilePhoto } from "../model/types";

const PHOTO_SLOTS_COUNT = 6;

const MEETING_GOAL_LABELS: Record<string, string> = {
  WALK: "Пойти гулять",
  TALK: "Общение",
  COFFEE: "Сходить в кафе",
  SPORT: "Заниматься спортом",
  CULTURE: "Выставка, концерт, театр и т.д.",
  OTHER: "Другое",
};

const COMMUNICATION_STYLE_LABELS: Record<string, string> = {
  LISTENER: "Больше слушаю",
  TALKER: "Больше говорю",
  BALANCED: "Баланс",
};

const GENDER_LABELS: Record<string, string> = {
  male: "Мужской",
  female: "Женский",
  MALE: "Мужской",
  FEMALE: "Женский",
};

const getTextValue = (value?: string | null, fallback = "Не указано") => {
  const text = value?.trim();

  return text ? text : fallback;
};

const getMappedValue = (
  value: string | null | undefined,
  labels: Record<string, string>,
) => {
  const text = getTextValue(value);

  return labels[text] ?? text;
};

const getBirthDateLabel = (birthDate?: string | null) => {
  const value = birthDate?.trim();

  if (!value) {
    return "Не указана";
  }

  const [year, month, day] = value.split("-");

  if (year && month && day) {
    return `${day}.${month}.${year}`;
  }

  return value;
};

const getLocationLabel = (city?: { name?: string; region?: string } | null) => {
  if (!city?.name) {
    return "Город не указан";
  }

  return city.region ? `${city.name}, ${city.region}` : city.name;
};

const getPhotoUri = (photo?: UserProfilePhoto) =>
  photo?.thumbnailUrl || photo?.url || undefined;

const getProfilePhotos = (photos: UserProfilePhoto[] = []) =>
  [...photos].sort((left, right) => left.position - right.position);

const getProfileErrorText = (error: unknown) => {
  const apiError = normalizeApiError(error);

  if (
    apiError.status === 401 ||
    apiError.status === 403 ||
    apiError.message === "No refresh token"
  ) {
    return "Нет доступа к профилю. Войдите в аккаунт еще раз.";
  }

  return apiError.message;
};

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { profile, isLoading, isError, error, refetch } = useMyProfile();
  const photoSlots = Array.from({ length: PHOTO_SLOTS_COUNT }, (_, index) => index);
  const photos = getProfilePhotos(profile?.photos);
  const mainPhoto = photos.find((photo) => photo.isMain) ?? photos[0];
  const mainPhotoUri = getPhotoUri(mainPhoto);
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

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Мои фото</Text>
            <Text style={styles.sectionHint}>Добавьте до 6 фотографий</Text>
          </View>
          <View style={styles.photosGrid}>
            {photoSlots.map((slot) => {
              const photo = photos[slot];
              const photoUri = getPhotoUri(photo);

              return (
                <View key={slot} style={styles.photoTileWrap}>
                  <View style={styles.photoTile}>
                    {photoUri ? (
                      <Fragment>
                        <Image source={{ uri: photoUri }} style={styles.photo} />
                        {photo?.isMain ? (
                          <View style={styles.primaryPhotoBadge}>
                            <Text style={styles.primaryPhotoText}>Основное</Text>
                          </View>
                        ) : null}
                      </Fragment>
                    ) : (
                      <Text style={styles.photoAddIcon}>+</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

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
          value={getMappedValue(profile.meetingGoal, MEETING_GOAL_LABELS)}
          editable
        />
        <ProfileSection
          title="Стиль общения"
          value={getMappedValue(
            profile.communicationStyle,
            COMMUNICATION_STYLE_LABELS,
          )}
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
        <ProfileSection
          title="Пол"
          value={getMappedValue(profile.gender, GENDER_LABELS)}
        />
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

const ProfileSection = ({
  title,
  value,
  chips,
  emptyText,
  editable = false,
}: {
  title: string;
  value?: string;
  chips?: string[];
  emptyText?: string;
  editable?: boolean;
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {editable ? (
          <Pressable style={styles.editButton} hitSlop={10}>
            <PencilIcon width={14} height={14} color="#3B3D4B" />
          </Pressable>
        ) : null}
      </View>

      {value ? <Text style={styles.sectionValue}>{value}</Text> : null}

      {chips?.length ? (
        <View style={styles.chipsWrap}>
          {chips.map((chip) => (
            <View key={`${title}-${chip}`} style={styles.chip}>
              <Text style={styles.chipText}>{chip}</Text>
            </View>
          ))}
        </View>
      ) : emptyText ? (
        <Text style={styles.sectionValue}>{emptyText}</Text>
      ) : null}
    </View>
  );
};

const VerifiedBadge = () => {
  return (
    <View style={styles.verifiedBadge}>
      <Text style={styles.verifiedIcon}>✓</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  content: {
    gap: 16,
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
  verifiedBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#4D4D56",
    alignItems: "center",
    justifyContent: "center",
  },
  verifiedIcon: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "700",
    color: "#FFFFFF",
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 20,
    gap: 14,
  },
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
    marginHorizontal: -5,
    marginBottom: -10,
  },
  photoTileWrap: {
    width: "33.333%",
    paddingHorizontal: 5,
    marginBottom: 10,
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
  primaryPhotoBadge: {
    position: "absolute",
    top: 10,
    left: 10,
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
  photoAddIcon: {
    fontSize: 34,
    lineHeight: 34,
    color: "#7E8191",
    fontWeight: "300",
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
  saveButtonWrap: {
    paddingHorizontal: 16,
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
  sectionValue: {
    borderRadius: 18,
    backgroundColor: "#EEF0FA",
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    lineHeight: 22,
    color: "#3E4055",
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    backgroundColor: "#EEF0FA",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "600",
    color: "#3B3D4B",
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "#EEF0FA",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
