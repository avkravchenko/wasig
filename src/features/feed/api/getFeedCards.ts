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
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.content)) {
    return payload.content;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  return [];
};
