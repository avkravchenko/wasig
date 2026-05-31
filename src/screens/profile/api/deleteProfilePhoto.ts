import { privateApi } from "@/shared/api/privateApi";

export const deleteProfilePhoto = async (photoId: string) => {
  await privateApi.delete(
    `/api/v1/onboarding/photos/${encodeURIComponent(photoId)}`,
  );
};
