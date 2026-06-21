import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Modal from "react-native-modal";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { Hobby } from "@/entities/hobby";
import type { CommunicationStyle, MeetingGoal } from "@/entities/meeting";
import type { Town } from "@/entities/location";
import { getAllHobbies } from "@/features/userProfile/api/getAllHobbies";
import { getTowns } from "@/features/userProfile/api/getTowns";
import { useDebounce } from "@/shared/lib";
import type { ProfileUpdateInput } from "../model/hooks/useUpdateMyProfile";
import {
  PROFILE_COMMUNICATION_STYLE_OPTIONS,
  PROFILE_EDIT_TITLES,
  PROFILE_GENDER_OPTIONS,
  PROFILE_MEETING_GOAL_OPTIONS,
} from "../model/lib/profileEditOptions";
import type {
  MyProfile,
  ProfileEditableField,
  ProfileInterestDraft,
} from "../model/types";

const MAX_INTERESTS_COUNT = 3;
const DISPLAY_DATE_PATTERN = /^\d{2}\.\d{2}\.\d{4}$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

type ProfileEditModalProps = {
  field: ProfileEditableField | null;
  isSaving: boolean;
  onClose: () => void;
  onSave: (input: ProfileUpdateInput) => void;
  profile: MyProfile;
  visible: boolean;
};

type SelectButtonProps = {
  disabled?: boolean;
  label: string;
  onPress: () => void;
  selected?: boolean;
};

const getBirthDateInput = (birthDate?: string | null) => {
  const value = birthDate?.trim();

  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");

  if (year && month && day) {
    return `${day}.${month}.${year}`;
  }

  return value;
};

const isDatePartsValid = (year: string, month: string, day: string) => {
  const yearNumber = Number(year);
  const monthNumber = Number(month);
  const dayNumber = Number(day);
  const date = new Date(yearNumber, monthNumber - 1, dayNumber);

  return (
    date.getFullYear() === yearNumber &&
    date.getMonth() === monthNumber - 1 &&
    date.getDate() === dayNumber
  );
};

const isBirthDateValid = (birthDate: string) => {
  const value = birthDate.trim();

  if (DISPLAY_DATE_PATTERN.test(value)) {
    const [day, month, year] = value.split(".");

    return isDatePartsValid(year, month, day);
  }

  if (ISO_DATE_PATTERN.test(value)) {
    const [year, month, day] = value.split("-");

    return isDatePartsValid(year, month, day);
  }

  return false;
};

const getBirthDateRequestValue = (birthDate: string) => {
  const value = birthDate.trim();

  if (ISO_DATE_PATTERN.test(value)) {
    return value;
  }

  const [day, month, year] = value.split(".");

  return `${year}-${month}-${day}`;
};

const getGenderValue = (gender?: string | null): "MALE" | "FEMALE" | null => {
  const value = gender?.toUpperCase();

  return value === "MALE" || value === "FEMALE" ? value : null;
};

const getMeetingGoalValue = (value?: string | null): MeetingGoal | null =>
  PROFILE_MEETING_GOAL_OPTIONS.find((option) => option.value === value)?.value ??
  null;

const getCommunicationStyleValue = (
  value?: string | null,
): CommunicationStyle | null =>
  PROFILE_COMMUNICATION_STYLE_OPTIONS.find((option) => option.value === value)
    ?.value ?? null;

const getTownLabel = (town: Town) =>
  town.region ? `${town.name}, ${town.region}` : town.name;

const normalizeInterestDraft = (interest: Hobby): ProfileInterestDraft => ({
  id: interest.isCustom ? null : interest.id,
  isCustom: Boolean(interest.isCustom),
  name: interest.name,
});

const getInterestKey = (interest: ProfileInterestDraft) =>
  interest.id !== null && !interest.isCustom
    ? `interest-${interest.id}`
    : `custom-interest-${interest.name.toLowerCase()}`;

const isSameInterestName = (left: string, right: string) =>
  left.trim().toLowerCase() === right.trim().toLowerCase();

const SelectButton = ({
  disabled = false,
  label,
  onPress,
  selected = false,
}: SelectButtonProps) => (
  <Pressable
    style={[
      styles.selectButton,
      selected && styles.selectButtonSelected,
      disabled && styles.selectButtonDisabled,
    ]}
    disabled={disabled}
    onPress={onPress}
  >
    <Text
      style={[
        styles.selectButtonText,
        selected && styles.selectButtonTextSelected,
      ]}
    >
      {label}
    </Text>
  </Pressable>
);

const ProfileEditModal = ({
  field,
  isSaving,
  onClose,
  onSave,
  profile,
  visible,
}: ProfileEditModalProps) => {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(null);
  const [citySearch, setCitySearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<Town | null>(null);
  const [meetingGoal, setMeetingGoal] = useState<MeetingGoal | null>(null);
  const [communicationStyle, setCommunicationStyle] =
    useState<CommunicationStyle | null>(null);
  const [expectations, setExpectations] = useState("");
  const [interestSearch, setInterestSearch] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<
    ProfileInterestDraft[]
  >([]);

  const debouncedCitySearch = useDebounce(citySearch, 300);
  const debouncedInterestSearch = useDebounce(interestSearch, 300);

  const citiesQuery = useQuery({
    queryKey: ["profile-edit", "cities", debouncedCitySearch],
    queryFn: async ({ signal }) => {
      const response = await getTowns(debouncedCitySearch, signal);

      return Array.isArray(response.data) ? (response.data as Town[]) : [];
    },
    enabled: visible && field === "city",
  });

  const interestsQuery = useQuery({
    queryKey: ["profile-edit", "interests", debouncedInterestSearch],
    queryFn: async ({ signal }) => {
      const response = await getAllHobbies(debouncedInterestSearch, signal);

      return Array.isArray(response.data) ? (response.data as Hobby[]) : [];
    },
    enabled: visible && field === "interests",
  });

  useEffect(() => {
    if (!visible) {
      return;
    }

    setName(profile.name ?? "");
    setBirthDate(getBirthDateInput(profile.birthDate));
    setGender(getGenderValue(profile.gender));
    setSelectedCity(profile.city ?? null);
    setCitySearch(profile.city?.name ?? "");
    setMeetingGoal(getMeetingGoalValue(profile.meetingGoal));
    setCommunicationStyle(getCommunicationStyleValue(profile.communicationStyle));
    setExpectations(profile.expectations ?? "");
    setInterestSearch("");
    setSelectedInterests(
      profile.interests?.map((interest) => normalizeInterestDraft(interest)) ??
        [],
    );
  }, [field, profile, visible]);

  const suggestedInterests = useMemo(() => {
    const selectedKeys = new Set(selectedInterests.map(getInterestKey));

    return (interestsQuery.data ?? []).filter((interest) => {
      const draft = normalizeInterestDraft(interest);

      if (selectedKeys.has(getInterestKey(draft))) {
        return false;
      }

      return !selectedInterests.some((selectedInterest) =>
        isSameInterestName(selectedInterest.name, draft.name),
      );
    });
  }, [interestsQuery.data, selectedInterests]);

  const payload = useMemo<ProfileUpdateInput | null>(() => {
    if (!field) {
      return null;
    }

    switch (field) {
      case "name": {
        const value = name.trim();

        return value.length >= 2 ? { field, value } : null;
      }
      case "birthDate":
        return isBirthDateValid(birthDate)
          ? { field, value: getBirthDateRequestValue(birthDate) }
          : null;
      case "gender":
        return gender ? { field, value: gender } : null;
      case "city":
        return typeof selectedCity?.id === "number"
          ? { field, value: selectedCity.id }
          : null;
      case "meetingGoal":
        return meetingGoal ? { field, value: meetingGoal } : null;
      case "communicationStyle":
        return communicationStyle ? { field, value: communicationStyle } : null;
      case "expectations":
        return { field, value: expectations.trim() };
      case "interests": {
        if (selectedInterests.length > MAX_INTERESTS_COUNT) {
          return null;
        }

        const customInterests = selectedInterests
          .filter((interest) => interest.isCustom)
          .map((interest) => interest.name);
        const value = {
          interestIds: selectedInterests
            .filter((interest) => !interest.isCustom && interest.id !== null)
            .map((interest) => interest.id as number),
          ...(customInterests.length ? { customInterests } : {}),
        };

        return { field, value };
      }
      default:
        return null;
    }
  }, [
    birthDate,
    communicationStyle,
    expectations,
    field,
    gender,
    meetingGoal,
    name,
    selectedCity,
    selectedInterests,
  ]);

  const handleClose = () => {
    if (!isSaving) {
      onClose();
    }
  };

  const handleSave = () => {
    if (payload) {
      onSave(payload);
    }
  };

  const removeInterest = (interest: ProfileInterestDraft) => {
    const interestKey = getInterestKey(interest);

    setSelectedInterests((prev) =>
      prev.filter((item) => getInterestKey(item) !== interestKey),
    );
  };

  const addInterest = (interest: Hobby) => {
    if (selectedInterests.length >= MAX_INTERESTS_COUNT) {
      return;
    }

    const draft = normalizeInterestDraft(interest);

    setSelectedInterests((prev) => {
      const hasInterest = prev.some(
        (item) =>
          getInterestKey(item) === getInterestKey(draft) ||
          isSameInterestName(item.name, draft.name),
      );

      return hasInterest ? prev : [...prev, draft];
    });
  };

  const addCustomInterest = () => {
    const value = interestSearch.trim();

    if (!value || selectedInterests.length >= MAX_INTERESTS_COUNT) {
      return;
    }

    const hasInterest = selectedInterests.some((interest) =>
      isSameInterestName(interest.name, value),
    );

    if (hasInterest) {
      return;
    }

    setSelectedInterests((prev) => [
      ...prev,
      { id: null, isCustom: true, name: value },
    ]);
    setInterestSearch("");
  };

  const renderNameField = () => (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>Имя</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        placeholder="Твое имя"
        placeholderTextColor="#9B9EAA"
        maxLength={40}
        onChangeText={setName}
      />
      <Text style={styles.hintText}>Минимум 2 символа.</Text>
    </View>
  );

  const renderBirthDateField = () => (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>Дата рождения</Text>
      <TextInput
        style={styles.textInput}
        value={birthDate}
        placeholder="ДД.ММ.ГГГГ"
        placeholderTextColor="#9B9EAA"
        keyboardType="number-pad"
        maxLength={10}
        onChangeText={setBirthDate}
      />
      <Text style={styles.hintText}>Формат: 15.01.1999.</Text>
    </View>
  );

  const renderGenderField = () => (
    <View style={styles.fieldGroup}>
      {PROFILE_GENDER_OPTIONS.map((option) => (
        <SelectButton
          key={option.value}
          label={option.label}
          selected={gender === option.value}
          onPress={() => setGender(option.value)}
        />
      ))}
    </View>
  );

  const renderCityField = () => (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>Найти город</Text>
      <TextInput
        style={styles.textInput}
        value={citySearch}
        placeholder="Город"
        placeholderTextColor="#9B9EAA"
        onChangeText={setCitySearch}
      />
      {selectedCity ? (
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedInfoText}>
            Выбрано: {getTownLabel(selectedCity)}
          </Text>
        </View>
      ) : null}
      {citiesQuery.isLoading ? (
        <ActivityIndicator color="#30323E" />
      ) : (
        <View style={styles.optionsList}>
          {(citiesQuery.data ?? []).map((town) => (
            <SelectButton
              key={town.id}
              label={getTownLabel(town)}
              selected={selectedCity?.id === town.id}
              onPress={() => {
                setSelectedCity(town);
                setCitySearch(town.name);
              }}
            />
          ))}
        </View>
      )}
    </View>
  );

  const renderMeetingGoalField = () => (
    <View style={styles.fieldGroup}>
      {PROFILE_MEETING_GOAL_OPTIONS.map((option) => (
        <SelectButton
          key={option.value}
          label={option.label}
          selected={meetingGoal === option.value}
          onPress={() => setMeetingGoal(option.value)}
        />
      ))}
    </View>
  );

  const renderCommunicationStyleField = () => (
    <View style={styles.fieldGroup}>
      {PROFILE_COMMUNICATION_STYLE_OPTIONS.map((option) => (
        <SelectButton
          key={option.value}
          label={option.label}
          selected={communicationStyle === option.value}
          onPress={() => setCommunicationStyle(option.value)}
        />
      ))}
    </View>
  );

  const renderExpectationsField = () => (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>Ожидания от встречи</Text>
      <TextInput
        style={[styles.textInput, styles.textArea]}
        value={expectations}
        placeholder="Расскажите, чего вы ждете от встреч"
        placeholderTextColor="#9B9EAA"
        multiline
        maxLength={500}
        textAlignVertical="top"
        onChangeText={setExpectations}
      />
      <Text style={styles.counterText}>{expectations.length}/500</Text>
    </View>
  );

  const renderInterestsField = () => {
    const trimmedInterestSearch = interestSearch.trim();
    const hasSelectedInterestWithName = selectedInterests.some((interest) =>
      isSameInterestName(interest.name, trimmedInterestSearch),
    );
    const hasSuggestedInterestWithName = suggestedInterests.some((interest) =>
      isSameInterestName(interest.name, trimmedInterestSearch),
    );
    const canAddCustomInterest =
      trimmedInterestSearch.length > 1 &&
      !hasSelectedInterestWithName &&
      !hasSuggestedInterestWithName &&
      selectedInterests.length < MAX_INTERESTS_COUNT;

    return (
      <View style={styles.fieldGroup}>
        <Text style={styles.hintText}>Можно выбрать до 3 интересов.</Text>
        <View style={styles.chipsWrap}>
          {selectedInterests.length ? (
            selectedInterests.map((interest) => (
              <Pressable
                key={getInterestKey(interest)}
                style={styles.interestChip}
                onPress={() => removeInterest(interest)}
              >
                <Text style={styles.interestChipText}>{interest.name}</Text>
                <Text style={styles.interestChipRemove}>×</Text>
              </Pressable>
            ))
          ) : (
            <Text style={styles.emptyText}>Интересы не выбраны</Text>
          )}
        </View>
        <TextInput
          style={styles.textInput}
          value={interestSearch}
          placeholder="Поиск интересов"
          placeholderTextColor="#9B9EAA"
          onChangeText={setInterestSearch}
        />
        {canAddCustomInterest ? (
          <SelectButton
            label={`Добавить "${trimmedInterestSearch}"`}
            onPress={addCustomInterest}
          />
        ) : null}
        {interestsQuery.isLoading ? (
          <ActivityIndicator color="#30323E" />
        ) : (
          <View style={styles.optionsList}>
            {suggestedInterests.map((interest) => (
              <SelectButton
                key={interest.id}
                label={interest.name}
                disabled={selectedInterests.length >= MAX_INTERESTS_COUNT}
                onPress={() => addInterest(interest)}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderField = () => {
    switch (field) {
      case "name":
        return renderNameField();
      case "birthDate":
        return renderBirthDateField();
      case "gender":
        return renderGenderField();
      case "city":
        return renderCityField();
      case "meetingGoal":
        return renderMeetingGoalField();
      case "communicationStyle":
        return renderCommunicationStyleField();
      case "expectations":
        return renderExpectationsField();
      case "interests":
        return renderInterestsField();
      default:
        return null;
    }
  };

  const title = field ? PROFILE_EDIT_TITLES[field] : "";
  const isSaveDisabled = isSaving || !payload;

  return (
    <Modal
      isVisible={visible}
      swipeDirection="down"
      swipeThreshold={100}
      avoidKeyboard
      propagateSwipe
      style={styles.modal}
      onBackdropPress={handleClose}
      onSwipeComplete={handleClose}
    >
      <View
        style={[
          styles.sheet,
          { paddingBottom: Math.max(insets.bottom, 20) },
        ]}
      >
        <View
          pointerEvents="none"
          style={[
            styles.keyboardBackground,
            { bottom: -windowHeight, height: windowHeight },
          ]}
        />
        <View style={styles.swipeIndicator} />
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Pressable
            style={styles.closeButton}
            hitSlop={12}
            accessibilityRole="button"
            onPress={handleClose}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.bodyScroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.body}
        >
          {renderField()}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            style={[styles.footerButton, styles.cancelButton]}
            disabled={isSaving}
            onPress={handleClose}
          >
            <Text style={styles.cancelButtonText}>Отмена</Text>
          </Pressable>
          <Pressable
            style={[
              styles.footerButton,
              styles.saveButton,
              isSaveDisabled && styles.footerButtonDisabled,
            ]}
            disabled={isSaveDisabled}
            onPress={handleSave}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.saveButtonText}>Сохранить</Text>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  sheet: {
    maxHeight: "88%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  keyboardBackground: {
    position: "absolute",
    right: 0,
    left: 0,
    backgroundColor: "#FFFFFF",
  },
  swipeIndicator: {
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D8DAE2",
    marginBottom: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700",
    color: "#30323E",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF0FA",
  },
  closeButtonText: {
    fontSize: 24,
    lineHeight: 24,
    color: "#30323E",
  },
  bodyScroll: {
    flexGrow: 0,
    flexShrink: 1,
  },
  body: {
    gap: 12,
    paddingBottom: 16,
  },
  fieldGroup: {
    gap: 10,
  },
  fieldLabel: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: "#3E4055",
  },
  textInput: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#EEF0FA",
    borderRadius: 18,
    backgroundColor: "#F5F6F8",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    lineHeight: 20,
    color: "#30323E",
  },
  textArea: {
    minHeight: 132,
    borderRadius: 18,
  },
  hintText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#7E8191",
  },
  counterText: {
    alignSelf: "flex-end",
    fontSize: 12,
    lineHeight: 16,
    color: "#7E8191",
  },
  selectedInfo: {
    borderRadius: 16,
    backgroundColor: "#ECF4E0",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  selectedInfoText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    color: "#3B3D4B",
  },
  optionsList: {
    gap: 8,
  },
  selectButton: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: "#EEF0FA",
    borderRadius: 18,
    justifyContent: "center",
    backgroundColor: "#F5F6F8",
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  selectButtonSelected: {
    borderColor: "#30323E",
    backgroundColor: "#30323E",
  },
  selectButtonDisabled: {
    opacity: 0.45,
  },
  selectButtonText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#30323E",
  },
  selectButtonTextSelected: {
    color: "#FFFFFF",
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  interestChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 999,
    backgroundColor: "#30323E",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  interestChipText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  interestChipRemove: {
    fontSize: 17,
    lineHeight: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 18,
    color: "#7E8191",
  },
  footer: {
    flexDirection: "row",
    gap: 10,
  },
  footerButton: {
    flex: 1,
    height: 48,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  footerButtonDisabled: {
    opacity: 0.5,
  },
  cancelButton: {
    backgroundColor: "#EEF0FA",
  },
  cancelButtonText: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "700",
    color: "#30323E",
  },
  saveButton: {
    backgroundColor: "#30323E",
  },
  saveButtonText: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

export default ProfileEditModal;
