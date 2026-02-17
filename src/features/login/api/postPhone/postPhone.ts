import { publicApi } from "@/shared/api/publicApi";

export const postPhone = async (phoneNumber: string) => {
  return await publicApi.post(`/api/v1/auth/send-code`, {
    phoneNumber,
  });
};
