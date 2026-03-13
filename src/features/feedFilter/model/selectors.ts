import { FeedFilters } from "./types";

export const hasActiveFeedFilters = (filters: FeedFilters) =>
  Boolean(
    filters.search.trim() ||
      filters.townId !== null ||
      filters.hobbyIds.length ||
      filters.meetingGoals.length ||
      filters.onlyWithPhoto,
  );
