import { FeedFilterOption, FeedFilterOptions, FeedFilters } from "../model/types";

export const cloneFilters = (filters: FeedFilters): FeedFilters => ({
  ...filters,
  ageRange: [...filters.ageRange] as [number, number],
  distanceRange: [...filters.distanceRange] as [number, number],
  hobbyIds: [...filters.hobbyIds],
  meetingGoals: [...filters.meetingGoals],
  timeSlots: [...filters.timeSlots],
  durations: [...filters.durations],
});

export const areFiltersEqual = (left: FeedFilters, right: FeedFilters) =>
  left.search === right.search &&
  left.townId === right.townId &&
  left.gender === right.gender &&
  left.hasHistory === right.hasHistory &&
  left.availability === right.availability &&
  left.availableOnWeekdays === right.availableOnWeekdays &&
  left.communicationStyle === right.communicationStyle &&
  left.onlyVerifiedProfiles === right.onlyVerifiedProfiles &&
  left.onlyWithPhoto === right.onlyWithPhoto &&
  left.ageRange[0] === right.ageRange[0] &&
  left.ageRange[1] === right.ageRange[1] &&
  left.distanceRange[0] === right.distanceRange[0] &&
  left.distanceRange[1] === right.distanceRange[1] &&
  left.hobbyIds.length === right.hobbyIds.length &&
  left.hobbyIds.every((value, index) => value === right.hobbyIds[index]) &&
  left.meetingGoals.length === right.meetingGoals.length &&
  left.meetingGoals.every((value, index) => value === right.meetingGoals[index]) &&
  left.timeSlots.length === right.timeSlots.length &&
  left.timeSlots.every((value, index) => value === right.timeSlots[index]) &&
  left.durations.length === right.durations.length &&
  left.durations.every((value, index) => value === right.durations[index]);

export const getOptionLabel = (
  value: string,
  options: FeedFilterOption[] | undefined,
) => options?.find((option) => option.value === value)?.label ?? value;

export interface ActiveFilterChip {
  key: string;
  title: string;
  onPress: () => void;
}

export const buildActiveFilterChips = ({
  defaults,
  filters,
  options,
  patchFilters,
}: {
  defaults: FeedFilters;
  filters: FeedFilters;
  options?: FeedFilterOptions;
  patchFilters: (patch: Partial<FeedFilters>) => void;
}): ActiveFilterChip[] => {
  const chips: ActiveFilterChip[] = [];

  if (filters.gender) {
    chips.push({
      key: "gender",
      title: `Пол: ${getOptionLabel(filters.gender, options?.genderOptions)}`,
      onPress: () => patchFilters({ gender: defaults.gender }),
    });
  }

  if (
    filters.ageRange[0] !== defaults.ageRange[0] ||
    filters.ageRange[1] !== defaults.ageRange[1]
  ) {
    chips.push({
      key: "ageRange",
      title: `Возраст: ${filters.ageRange[0]}-${filters.ageRange[1]}`,
      onPress: () => patchFilters({ ageRange: defaults.ageRange }),
    });
  }

  if (
    filters.distanceRange[0] !== defaults.distanceRange[0] ||
    filters.distanceRange[1] !== defaults.distanceRange[1]
  ) {
    chips.push({
      key: "distanceRange",
      title: `Расстояние: ${filters.distanceRange[0]}-${filters.distanceRange[1]} км`,
      onPress: () => patchFilters({ distanceRange: defaults.distanceRange }),
    });
  }

  if (filters.meetingGoals.length > 0) {
    chips.push({
      key: "meetingGoals",
      title: `Цель встречи: ${filters.meetingGoals
        .map((goal) => getOptionLabel(goal, options?.activityTypeOptions))
        .join(", ")}`,
      onPress: () => patchFilters({ meetingGoals: defaults.meetingGoals }),
    });
  }

  if (filters.hasHistory !== defaults.hasHistory && filters.hasHistory) {
    chips.push({
      key: "hasHistory",
      title: "Есть история",
      onPress: () => patchFilters({ hasHistory: defaults.hasHistory }),
    });
  }

  if (filters.availability) {
    chips.push({
      key: "availability",
      title: `Когда: ${getOptionLabel(
        filters.availability,
        options?.whenAvailableOptions,
      )}`,
      onPress: () => patchFilters({ availability: defaults.availability }),
    });
  }

  if (
    filters.availableOnWeekdays !== defaults.availableOnWeekdays &&
    filters.availableOnWeekdays
  ) {
    chips.push({
      key: "availableOnWeekdays",
      title: "Договоримся на неделе",
      onPress: () =>
        patchFilters({
          availableOnWeekdays: defaults.availableOnWeekdays,
        }),
    });
  }

  if (filters.timeSlots.length > 0) {
    chips.push({
      key: "timeSlots",
      title: `Время: ${filters.timeSlots
        .map((slot) => getOptionLabel(slot, options?.timeOfDayOptions))
        .join(", ")}`,
      onPress: () => patchFilters({ timeSlots: defaults.timeSlots }),
    });
  }

  if (filters.durations.length > 0) {
    chips.push({
      key: "durations",
      title: `Длительность: ${filters.durations
        .map((duration) => getOptionLabel(duration, options?.durationOptions))
        .join(", ")}`,
      onPress: () => patchFilters({ durations: defaults.durations }),
    });
  }

  if (filters.communicationStyle) {
    chips.push({
      key: "communicationStyle",
      title: `Стиль: ${getOptionLabel(
        filters.communicationStyle,
        options?.communicationStyleOptions,
      )}`,
      onPress: () =>
        patchFilters({
          communicationStyle: defaults.communicationStyle,
        }),
    });
  }

  if (
    filters.onlyVerifiedProfiles !== defaults.onlyVerifiedProfiles &&
    filters.onlyVerifiedProfiles
  ) {
    chips.push({
      key: "onlyVerifiedProfiles",
      title: "Профиль подтвержден",
      onPress: () =>
        patchFilters({
          onlyVerifiedProfiles: defaults.onlyVerifiedProfiles,
        }),
    });
  }

  if (filters.onlyWithPhoto !== defaults.onlyWithPhoto && filters.onlyWithPhoto) {
    chips.push({
      key: "onlyWithPhoto",
      title: "Только с фото",
      onPress: () =>
        patchFilters({
          onlyWithPhoto: defaults.onlyWithPhoto,
        }),
    });
  }

  return chips;
};
