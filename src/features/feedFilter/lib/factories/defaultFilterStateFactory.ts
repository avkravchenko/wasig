import { FeedFilterOptions, FeedFilters } from "../../model/types";

const defaultFilterStateFactory = (
  options?: Pick<FeedFilterOptions, "minAge" | "maxAge" | "maxDistance">,
): FeedFilters => {
  return {
    search: "",
    townId: null,
    hobbyIds: [],
    gender: null,
    ageRange: [options?.minAge ?? 18, options?.maxAge ?? 100],
    distanceRange: [0, options?.maxDistance ?? 100],
    meetingGoals: [],
    hasHistory: false,
    availability: null,
    availableOnWeekdays: false,
    timeSlots: [],
    durations: [],
    communicationStyle: null,
    onlyVerifiedProfiles: false,
    onlyWithPhoto: false,
  };
};

export default defaultFilterStateFactory;
