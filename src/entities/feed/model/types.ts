import type { Hobby } from "../../hobby";

export enum FeedAvailability {
  TODAY = "TODAY",
  TOMORROW = "TOMORROW",
  THIS_WEEK = "THIS_WEEK",
  WEEKEND = "WEEKEND",
}

export enum FeedDuration {
  ONE_HOUR = "ONE_HOUR",
  TWO_HOURS = "TWO_HOURS",
  THREE_HOURS = "THREE_HOURS",
  ALL_DAY = "ALL_DAY",
  FLEXIBLE = "FLEXIBLE",
}

export enum FeedTimeOfDay {
  MORNING = "MORNING",
  AFTERNOON = "AFTERNOON",
  EVENING = "EVENING",
  NIGHT = "NIGHT",
}

export interface FeedItem {
  activityId: string;
  userId: string;
  userName: string;
  userAge: number;
  userGender: string;
  isVerified: boolean;
  mainPhotoUrl: string | null;
  mainPhotoThumbnailUrl: string | null;
  activityTitle: string;
  activityDescription: string;
  activityType: string;
  activityTypeLabel: string;
  interests: Hobby[];
  whenAvailable: FeedAvailability;
  timeOfDay: FeedTimeOfDay | string;
  duration: FeedDuration;
  distanceKm: number | null;
  cityName: string;
}
