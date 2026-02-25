import { FeedItem } from "@/entities/feed";
import { privateApi } from "@/shared/api/privateApi";
import { FeedCardsQuery, FeedCardsResponse } from "../model/types/feed";

export const getFeedCards = async ({
  page = 0,
  size = 20,
  latitude,
  longitude,
  signal,
}: FeedCardsQuery): Promise<FeedCardsResponse> => {
  const hasValidLatitude = typeof latitude === "number" && Number.isFinite(latitude);
  const hasValidLongitude =
    typeof longitude === "number" && Number.isFinite(longitude);

  const params: Record<string, number> = {
    page,
    size,
  };

  if (hasValidLatitude && hasValidLongitude) {
    params.latitude = latitude;
    params.longitude = longitude;
  }

  const response = await privateApi.get<FeedCardsResponse>("/api/v1/feed/cards", {
    params,
    signal,
  });

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
