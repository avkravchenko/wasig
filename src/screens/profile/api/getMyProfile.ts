import { privateApi } from "@/shared/api/privateApi";
import { normalizeApiError } from "@/shared/api/errors";
import {
  normalizeProfilePhoto,
  normalizeProfilePhotoUrl,
} from "../model/lib/profilePhotos";
import type { MyProfile, UserProfilePhoto } from "../model/types";

type MyProfileResponse = Omit<Partial<MyProfile>, "photos"> & {
  town?: MyProfile["city"];
  profileCompleted?: boolean;
  photos?: UserProfilePhoto[] | string[];
};

type MyProfileApiResponse =
  | MyProfileResponse
  | {
      data?: MyProfileResponse;
    };

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isProfileResponse = (value: unknown): value is MyProfileResponse => {
  if (!isObject(value)) {
    return false;
  }

  return (
    "id" in value ||
    "phoneNumber" in value ||
    "name" in value ||
    "age" in value ||
    "birthDate" in value ||
    "gender" in value ||
    "city" in value ||
    "town" in value ||
    "meetingGoal" in value ||
    "communicationStyle" in value ||
    "expectations" in value ||
    "interests" in value ||
    "photos" in value ||
    "isProfileCompleted" in value ||
    "profileCompleted" in value ||
    "onboardingCompleted" in value
  );
};

const getProfileResponse = (
  response: MyProfileApiResponse,
): MyProfileResponse | null => {
  if (isProfileResponse(response)) {
    return response;
  }

  if (isObject(response) && isProfileResponse(response.data)) {
    return response.data;
  }

  return null;
};

const normalizePhotos = (
  photos: MyProfileResponse["photos"],
): UserProfilePhoto[] => {
  if (!Array.isArray(photos)) {
    return [];
  }

  return photos
    .map((photo, index): UserProfilePhoto | null => {
      if (typeof photo === "string") {
        const photoUrl = normalizeProfilePhotoUrl(photo);

        if (!photoUrl) {
          return null;
        }

        return {
          id: photo,
          url: photoUrl,
          thumbnailUrl: photoUrl,
          position: index + 1,
          isMain: index === 0,
        };
      }

      if (photo && typeof photo.url === "string") {
        return normalizeProfilePhoto(photo, index);
      }

      return null;
    })
    .filter((photo): photo is UserProfilePhoto => photo !== null);
};

const normalizeProfile = (payload: MyProfileResponse): MyProfile => ({
  id: payload.id ?? "",
  phoneNumber: payload.phoneNumber ?? null,
  name: payload.name ?? null,
  age: payload.age ?? null,
  birthDate: payload.birthDate ?? null,
  gender: payload.gender ?? null,
  city: payload.city ?? payload.town ?? null,
  meetingGoal: payload.meetingGoal ?? null,
  communicationStyle: payload.communicationStyle ?? null,
  expectations: payload.expectations ?? null,
  interests: payload.interests ?? [],
  photos: normalizePhotos(payload.photos),
  isProfileCompleted:
    payload.isProfileCompleted ?? payload.profileCompleted ?? false,
  onboardingCompleted: payload.onboardingCompleted ?? false,
});

export const getMyProfile = async (
  signal?: AbortSignal,
): Promise<MyProfile> => {
  console.log("[getMyProfile] GET /api/v1/users/me/profile started");

  try {
    const response = await privateApi.get<MyProfileApiResponse>(
      "/api/v1/users/me/profile",
      { signal },
    );
    const payload = getProfileResponse(response.data);

    console.log("[getMyProfile] response status:", response.status);
    console.log("[getMyProfile] response data:", response.data);

    if (!payload) {
      console.log("[getMyProfile] empty profile payload:", response.data);
      throw new Error("Profile response payload is empty");
    }

    return normalizeProfile(payload);
  } catch (error) {
    console.log("[getMyProfile] request failed:", normalizeApiError(error));
    throw error;
  }
};
