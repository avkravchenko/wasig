import { privateApi } from "@/shared/api/privateApi";

export const reorderProfilePhotos = async (photoIds: string[]) => {
  await privateApi.put("/api/v1/onboarding/photos/reorder", photoIds);
};
