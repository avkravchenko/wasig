import { Hobby } from "../hobby";

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
  whenAvailable: string;
  timeOfDay: string;
  duration: string;
  distanceKm: number | null;
  cityName: string;
}
