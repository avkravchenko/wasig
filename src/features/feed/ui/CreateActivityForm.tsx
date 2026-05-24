import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FeedAvailability,
  FeedDuration,
  FeedTimeOfDay,
  getFeedAvailabilityLabel,
  getFeedDurationLabel,
  getFeedTimeOfDayLabel,
} from "@/entities/feed";
import { getApiErrorMessage } from "@/shared/api/errors";
import { useCurrentLocation } from "@/shared/lib";
import { Button, RadioGroup } from "@/shared/ui";
import useCreateActivity from "../model/hooks/useCreateActivity";
import { CreateActivityRequest } from "../model/types/activity";

type CreateActivityFormProps = {
  isVisible: boolean;
  onClose: () => void;
};

const ACTIVITY_TYPES = [
  { label: "Бар", value: "BAR" },
  { label: "Кофе", value: "COFFEE" },
  { label: "Прогулка", value: "WALK" },
  { label: "Кино", value: "MOVIE" },
  { label: "Спорт", value: "SPORT" },
];

const AVAILABILITY_OPTIONS = [
  FeedAvailability.TODAY,
  FeedAvailability.TOMORROW,
  FeedAvailability.THIS_WEEK,
  FeedAvailability.WEEKEND,
];

const TIME_OF_DAY_OPTIONS = [
  FeedTimeOfDay.MORNING,
  FeedTimeOfDay.AFTERNOON,
  FeedTimeOfDay.EVENING,
  FeedTimeOfDay.NIGHT,
];

const DURATION_OPTIONS = [
  FeedDuration.ONE_HOUR,
  FeedDuration.TWO_HOURS,
  FeedDuration.THREE_HOURS,
  FeedDuration.ALL_DAY,
  FeedDuration.FLEXIBLE,
];
const KEYBOARD_OVERLAP = 18;

const CreateActivityForm = ({
  isVisible,
  onClose,
}: CreateActivityFormProps) => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { latitude, longitude } = useCurrentLocation();
  const createActivity = useCreateActivity();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [title, setTitle] = useState("Сходить в бар");
  const [description, setDescription] = useState(
    "О большом, о вечном, о бесконечном. Короч говоря, мне нужна компания...",
  );
  const [activityType, setActivityType] = useState("BAR");
  const [whenAvailable, setWhenAvailable] = useState(FeedAvailability.THIS_WEEK);
  const [timeOfDay, setTimeOfDay] = useState(FeedTimeOfDay.EVENING);
  const [duration, setDuration] = useState(FeedDuration.TWO_HOURS);
  const [about, setAbout] = useState("");
  const [communicationNote, setCommunicationNote] = useState(
    "Я спокоен и заинтересован",
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isSubmitDisabled =
    title.trim().length === 0 || description.trim().length === 0;
  const sheetTopOffset = insets.top + 20;
  const sheetMaxHeight = Math.max(height - sheetTopOffset, 360);
  const keyboardLift =
    keyboardHeight > 0 ? Math.max(0, keyboardHeight - KEYBOARD_OVERLAP) : 0;
  const sheetHeight = Math.max(320, sheetMaxHeight - keyboardLift);
  const footerBottomPadding =
    keyboardHeight > 0 ? 36 + KEYBOARD_OVERLAP : insets.bottom + 24;

  const activityTypeOptions = useMemo(
    () =>
      ACTIVITY_TYPES.map((option) => ({
        ...option,
        selected: option.value === activityType,
      })),
    [activityType],
  );

  const availabilityOptions = useMemo(
    () =>
      AVAILABILITY_OPTIONS.map((value) => ({
        label: getFeedAvailabilityLabel(value),
        selected: value === whenAvailable,
        value,
      })),
    [whenAvailable],
  );

  const timeOfDayOptions = useMemo(
    () =>
      TIME_OF_DAY_OPTIONS.map((value) => ({
        label: getFeedTimeOfDayLabel(value),
        selected: value === timeOfDay,
        value,
      })),
    [timeOfDay],
  );

  const durationOptions = useMemo(
    () =>
      DURATION_OPTIONS.map((value) => ({
        label: getFeedDurationLabel(value),
        selected: value === duration,
        value,
      })),
    [duration],
  );

  const handleSubmit = async () => {
    setSubmitError(null);

    const payload: CreateActivityRequest = {
      title: title.trim(),
      description: description.trim(),
      activityType,
      whenAvailable,
      timeOfDay,
      duration,
      about: about.trim(),
      communicationNote: communicationNote.trim(),
      latitude: typeof latitude === "number" ? latitude : 0,
      longitude: typeof longitude === "number" ? longitude : 0,
    };

    try {
      await createActivity.mutateAsync(payload);
      onClose();
    } catch (error) {
      setSubmitError(getApiErrorMessage(error));
    }
  };

  const scrollToFormBottom = useCallback(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 220);
  }, []);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(showEvent, (event) => {
      setKeyboardHeight(Math.max(0, event.endCoordinates.height));
    });
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [insets.bottom]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      swipeThreshold={80}
      style={styles.modal}
      backdropOpacity={0.24}
      propagateSwipe
      scrollTo={(params) => scrollViewRef.current?.scrollTo(params)}
      scrollOffset={scrollOffset}
      scrollOffsetMax={sheetMaxHeight}
    >
      <View
        style={[
          styles.sheet,
          {
            height: sheetHeight,
            marginBottom: keyboardLift,
            marginTop: sheetTopOffset,
          },
        ]}
      >
        <View style={styles.grabber} />
        <Text style={styles.title}>Новая активность</Text>

        <ScrollView
          ref={scrollViewRef}
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
            setScrollOffset(event.nativeEvent.contentOffset.y);
          }}
        >
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Название</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Например, сходить в бар"
              style={styles.input}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Описание</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Кого ищешь и чем хотите заняться"
              multiline
              style={[styles.input, styles.multilineInput]}
            />
          </View>

          <RadioGroup
            title="Тип активности"
            variant="chip"
            options={activityTypeOptions}
            onChange={(option) => setActivityType(option.value)}
          />
          <RadioGroup
            title="Когда"
            variant="chip"
            options={availabilityOptions}
            onChange={(option) => setWhenAvailable(option.value)}
          />
          <RadioGroup
            title="Время дня"
            variant="chip"
            options={timeOfDayOptions}
            onChange={(option) => setTimeOfDay(option.value)}
          />
          <RadioGroup
            title="Длительность"
            variant="chip"
            options={durationOptions}
            onChange={(option) => setDuration(option.value)}
          />

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>О себе</Text>
            <TextInput
              value={about}
              onChangeText={setAbout}
              placeholder="Коротко о себе"
              multiline
              style={[styles.input, styles.multilineInput]}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Комментарий к общению</Text>
            <TextInput
              value={communicationNote}
              onChangeText={setCommunicationNote}
              onFocus={scrollToFormBottom}
              placeholder="Как с тобой лучше общаться"
              multiline
              style={[styles.input, styles.multilineInput]}
            />
          </View>

          {submitError ? (
            <Text style={styles.errorText}>{submitError}</Text>
          ) : null}
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: footerBottomPadding }]}>
          <Button
            type="secondary"
            size="lg"
            title="Создать"
            onPress={handleSubmit}
            loading={createActivity.isPending}
            disabled={isSubmitDisabled}
          />
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  grabber: {
    alignSelf: "center",
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#D7DCE2",
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    color: "#30323E",
    textAlign: "center",
    marginBottom: 16,
  },
  scroll: {
    flex: 1,
    minHeight: 0,
  },
  content: {
    gap: 18,
    paddingBottom: 32,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: "#30323E",
  },
  input: {
    minHeight: 48,
    borderRadius: 18,
    backgroundColor: "#F3F5F7",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    lineHeight: 20,
    color: "#30323E",
  },
  multilineInput: {
    minHeight: 92,
    textAlignVertical: "top",
  },
  errorText: {
    color: "#D04444",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    paddingTop: 8,
    paddingHorizontal: 4,
  },
});

export default CreateActivityForm;
