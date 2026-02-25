import { FeedItem } from "@/entities/feed";

export interface FeedCardsQuery {
  page?: number;
  size?: number;
  latitude?: number;
  longitude?: number;
  signal?: AbortSignal;
}

export interface FeedCardsPagedResponse {
  cards?: FeedItem[];
  content?: FeedItem[];
  items?: FeedItem[];
  data?: FeedItem[];
}

export type FeedCardsResponse = FeedItem[] | FeedItem | FeedCardsPagedResponse;
