import { FeedItem } from "@/entities/feed";
import { privateApi } from "@/shared/api/privateApi";
import {
  FeedCardsQuery,
  FeedCardsRequest,
  FeedCardsResponse,
} from "../model/types/feed";

export const createFeedCardsRequest = ({
  filters,
  defaults,
  page = 0,
  size = 20,
  latitude,
  longitude,
}: Omit<FeedCardsQuery, "signal">): FeedCardsRequest => {
  const hasValidLatitude = typeof latitude === "number" && Number.isFinite(latitude);
  const hasValidLongitude =
    typeof longitude === "number" && Number.isFinite(longitude);

  return {
    gender: filters.gender ?? undefined,
    ageMin:
      filters.ageRange[0] !== defaults.ageRange[0]
        ? filters.ageRange[0]
        : undefined,
    ageMax:
      filters.ageRange[1] !== defaults.ageRange[1]
        ? filters.ageRange[1]
        : undefined,
    distanceMaxKm:
      filters.distanceRange[1] !== defaults.distanceRange[1]
        ? filters.distanceRange[1]
        : undefined,
    activityTypes:
      filters.meetingGoals.length > 0
        ? filters.meetingGoals
        : undefined,
    whenAvailable:
      filters.availability || filters.availableOnWeekdays
        ? [
            ...(filters.availability ? [filters.availability] : []),
            ...(filters.availableOnWeekdays ? ["THIS_WEEK"] : []),
          ]
        : undefined,
    timeOfDay: filters.timeSlots.length > 0 ? filters.timeSlots : undefined,
    duration: filters.durations.length > 0 ? filters.durations : undefined,
    communicationStyle: filters.communicationStyle ?? undefined,
    verifiedOnly: filters.onlyVerifiedProfiles ? true : undefined,
    hasHistory: filters.hasHistory ? true : undefined,
    ...(hasValidLatitude && hasValidLongitude
      ? {
          latitude,
          longitude,
        }
      : {}),
    page,
    size,
  };
};

export const getFeedCards = async ({
  filters,
  defaults,
  page = 0,
  size = 20,
  latitude,
  longitude,
  signal,
}: FeedCardsQuery): Promise<FeedCardsResponse> => {
  const response = await privateApi.post<FeedCardsResponse>(
    "/api/v1/feed",
    createFeedCardsRequest({
      filters,
      defaults,
      page,
      size,
      latitude,
      longitude,
    }),
    { signal },
  );

  return response.data;
};

export const extractFeedCards = (payload: FeedCardsResponse): FeedItem[] => {
  const visited = new Set<unknown>();

  const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null;

  const isFeedItem = (value: unknown): value is FeedItem =>
    isObject(value) && typeof value.activityId === "string";

  const toFeedItems = (value: unknown): FeedItem[] => {
    if (!Array.isArray(value)) {
      return [];
    }

    return value.filter(isFeedItem);
  };

  const resolve = (value: unknown): FeedItem[] => {
    if (!value || visited.has(value)) {
      return [];
    }

    if (Array.isArray(value)) {
      return toFeedItems(value);
    }

    if (!isObject(value)) {
      return [];
    }

    visited.add(value);

    if (typeof value.activityId === "string") {
      return [value as unknown as FeedItem];
    }

    const directKeys = ["cards", "content", "items"];
    for (const key of directKeys) {
      const cards = toFeedItems(value[key]);
      if (cards.length > 0) {
        return cards;
      }
    }

    const nestedKeys = ["data", "payload", "result", "results", "response"];
    for (const key of nestedKeys) {
      const nested = resolve(value[key]);
      if (nested.length > 0) {
        return nested;
      }
    }

    return [];
  };

  return resolve(payload);
};
