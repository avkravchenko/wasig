import { createPhotoFormData } from "@/shared/helpers";
import { privateApi } from "@/shared/api/privateApi";
import type { UserProfilePhoto } from "../model/types";

export type AddProfilePhotoParams = {
  photoUri: string;
  position: number;
};

export const addProfilePhoto = async ({
  photoUri,
  position,
}: AddProfilePhotoParams): Promise<UserProfilePhoto> => {
  const response = await privateApi.post<UserProfilePhoto>(
    "/api/v1/onboarding/photos",
    createPhotoFormData(photoUri),
    {
      params: { position },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};
