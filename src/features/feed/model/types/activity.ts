import { FeedAvailability, FeedDuration, FeedTimeOfDay } from "@/entities/feed";

export interface CreateActivityRequest {
  title: string;
  description: string;
  activityType: string;
  whenAvailable: FeedAvailability;
  timeOfDay: FeedTimeOfDay;
  duration: FeedDuration;
  about: string;
  communicationNote: string;
  latitude: number;
  longitude: number;
}
