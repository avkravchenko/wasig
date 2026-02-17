import { privateApi } from "@/shared/api/privateApi";

export const postUserName = async (name: string) => {
  return await privateApi.post(`/api/v1/onboarding/name`, {
    name,
  });
};
