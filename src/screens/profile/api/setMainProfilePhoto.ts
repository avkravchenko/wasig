import { privateApi } from "@/shared/api/privateApi";
import type { UserProfilePhoto } from "../model/types";

export const setMainProfilePhoto = async (
  photoId: string,
): Promise<UserProfilePhoto> => {
  const response = await privateApi.put<UserProfilePhoto>(
    `/api/v1/onboarding/photos/${encodeURIComponent(photoId)}/main`,
  );

  return response.data;
};
