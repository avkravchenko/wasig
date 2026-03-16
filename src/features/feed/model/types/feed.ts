import { FeedFilters } from "@/features/feedFilter";
import { FeedItem } from "@/entities/feed";

export interface FeedCardsQuery {
  filters: FeedFilters;
  defaults: FeedFilters;
  page?: number;
  size?: number;
  latitude?: number;
  longitude?: number;
  signal?: AbortSignal;
}

export interface FeedCardsRequest {
  gender?: string;
  ageMin?: number;
  ageMax?: number;
  distanceMaxKm?: number;
  activityTypes?: string[];
  whenAvailable?: string[];
  timeOfDay?: string[];
  duration?: string[];
  communicationStyle?: string;
  verifiedOnly?: boolean;
  hasHistory?: boolean;
  latitude?: number;
  longitude?: number;
  page: number;
  size: number;
}

export interface FeedCardsPagedResponse {
  cards?: FeedItem[];
  content?: FeedItem[];
  items?: FeedItem[];
  data?: FeedItem[];
}

export type FeedCardsResponse = FeedItem[] | FeedItem | FeedCardsPagedResponse;
