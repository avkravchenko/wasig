import { Hobby } from "../hobby";

export interface FeedItem {
  activityId: string;
  userId: string;
  userName: string;
  userAge: number;
  userGender: string;
  isVerified: boolean;
  mainPhotoUrl: string;
  mainPhotoThumbnailUrl: string;
  activityTitle: string;
  activityDescription: string;
  activityType: string;
  activityTypeLabel: string;
  interests: Hobby[];
  whenAvailable: string;
  timeOfDay: string;
  duration: string;
  distanceKm: number;
  cityName: string;
}
