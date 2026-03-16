import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Toggler } from "@/shared/ui";
import { FeedFilterOptions, FeedFilters } from "../model/types";
import FilterAge from "./FilterAge";
import FilterConversationStyle from "./FilterConversationStyle";
import FilterDistance from "./FilterDistance";
import FilterGender from "./FilterGender";
import FilterMeetingGoal from "./FilterMeetingGoal";
import FilterProfileVerification from "./FilterProfileVerification";
import FilterSchedule from "./FilterSchedule";

export const SECTION_KEYS = [
  "main",
  "meeting-goal",
  "history",
  "schedule",
  "conversation-style",
  "profile-verification",
] as const;

export type FeedFilterSectionKey = (typeof SECTION_KEYS)[number];

interface FeedFilterSectionProps {
  section: FeedFilterSectionKey;
  defaults: FeedFilters;
  filters: FeedFilters;
  options?: FeedFilterOptions;
  onPatchFilters: (patch: Partial<FeedFilters>) => void;
}

const FeedFilterSection = ({
  section,
  defaults,
  filters,
  options,
  onPatchFilters,
}: FeedFilterSectionProps) => {
  if (section === "main") {
    return (
      <View style={styles.section}>
        <FilterGender
          value={filters.gender}
          options={options?.genderOptions ?? []}
          onChange={(gender) => onPatchFilters({ gender })}
        />
        <FilterAge
          value={filters.ageRange}
          minValue={defaults.ageRange[0]}
          maxValue={defaults.ageRange[1]}
          onChange={(ageRange) => onPatchFilters({ ageRange })}
        />
        <FilterDistance
          value={filters.distanceRange}
          maxValue={defaults.distanceRange[1]}
          onChange={(distanceRange) => onPatchFilters({ distanceRange })}
        />
      </View>
    );
  }

  if (section === "meeting-goal") {
    return (
      <View style={styles.section}>
        <FilterMeetingGoal
          value={filters.meetingGoals}
          options={options?.activityTypeOptions ?? []}
          onChange={(meetingGoals) => onPatchFilters({ meetingGoals })}
        />
      </View>
    );
  }

  if (section === "history") {
    return (
      <View style={styles.section}>
        <Toggler
          title="Есть история"
          checked={filters.hasHistory}
          onChange={(hasHistory) => onPatchFilters({ hasHistory })}
        />
      </View>
    );
  }

  if (section === "schedule") {
    return (
      <View style={styles.section}>
        <FilterSchedule
          availability={filters.availability}
          timeSlots={filters.timeSlots}
          durations={filters.durations}
          availabilityOptions={options?.whenAvailableOptions ?? []}
          timeOfDayOptions={options?.timeOfDayOptions ?? []}
          durationOptions={options?.durationOptions ?? []}
          onAvailabilityChange={(availability) => onPatchFilters({ availability })}
          onTimeSlotsChange={(timeSlots) => onPatchFilters({ timeSlots })}
          onDurationsChange={(durations) => onPatchFilters({ durations })}
        />
      </View>
    );
  }

  if (section === "conversation-style") {
    return (
      <View style={styles.section}>
        <FilterConversationStyle
          value={filters.communicationStyle}
          options={options?.communicationStyleOptions ?? []}
          onChange={(communicationStyle) => onPatchFilters({ communicationStyle })}
        />
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <FilterProfileVerification
        value={filters.onlyVerifiedProfiles}
        onChange={(onlyVerifiedProfiles) => onPatchFilters({ onlyVerifiedProfiles })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 30,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
  },
});

export default memo(FeedFilterSection);
