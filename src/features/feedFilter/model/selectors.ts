import { FeedFilters } from "./types";
import defaultFilterStateFactory from "../lib/factories/defaultFilterStateFactory";

export const hasActiveFeedFilters = (
  filters: FeedFilters,
  defaults: FeedFilters = defaultFilterStateFactory(),
) =>
  Boolean(
    filters.search.trim() ||
      filters.townId !== null ||
      filters.hobbyIds.length ||
      filters.gender !== defaults.gender ||
      filters.ageRange[0] !== defaults.ageRange[0] ||
      filters.ageRange[1] !== defaults.ageRange[1] ||
      filters.distanceRange[0] !== defaults.distanceRange[0] ||
      filters.distanceRange[1] !== defaults.distanceRange[1] ||
      filters.meetingGoals.length ||
      filters.hasHistory !== defaults.hasHistory ||
      filters.availability !== defaults.availability ||
      filters.availableOnWeekdays !== defaults.availableOnWeekdays ||
      filters.timeSlots.length !== defaults.timeSlots.length ||
      filters.durations.length !== defaults.durations.length ||
      filters.communicationStyle !== defaults.communicationStyle ||
      filters.onlyVerifiedProfiles !== defaults.onlyVerifiedProfiles ||
      filters.onlyWithPhoto !== defaults.onlyWithPhoto,
  );
