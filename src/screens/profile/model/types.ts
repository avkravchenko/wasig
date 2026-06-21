import type { Hobby } from "@/entities/hobby";
import type { Town } from "@/entities/location";

export interface UserProfilePhoto {
  id: string;
  url: string;
  thumbnailUrl?: string | null;
  position: number;
  isMain: boolean;
}

export interface MyProfile {
  id: string;
  phoneNumber?: string | null;
  name?: string | null;
  age?: number | null;
  birthDate?: string | null;
  gender?: string | null;
  city?: Town | null;
  meetingGoal?: string | null;
  communicationStyle?: string | null;
  expectations?: string | null;
  interests?: Hobby[];
  photos?: UserProfilePhoto[];
  isProfileCompleted: boolean;
  onboardingCompleted: boolean;
}

export type ProfileEditableField =
  | "name"
  | "birthDate"
  | "gender"
  | "city"
  | "meetingGoal"
  | "communicationStyle"
  | "expectations"
  | "interests";

export type ProfileInterestDraft = {
  id: number | null;
  name: string;
  isCustom: boolean;
};
