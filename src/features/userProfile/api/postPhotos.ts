import { privateApi } from "@/shared/api/privateApi";

interface UploadResponse {
  urls: string[];
}

export const postPhotos = async (
  formData: FormData
): Promise<UploadResponse> => {
  return await privateApi("/api/v1/onboarding/photos", {
    method: "POST",
    data: formData,
  });
};
