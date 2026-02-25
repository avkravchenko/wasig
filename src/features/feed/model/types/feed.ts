import { FeedItem } from "@/entities/feed";

export interface FeedCardsQuery {
  page?: number;
  size?: number;
  latitude?: number;
  longitude?: number;
  signal?: AbortSignal;
}

export interface FeedCardsPagedResponse {
  content?: FeedItem[];
  items?: FeedItem[];
}

export type FeedCardsResponse = FeedItem[] | FeedCardsPagedResponse;
