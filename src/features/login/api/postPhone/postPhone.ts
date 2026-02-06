import { privateApi } from "@/shared/api/privateApi";

export const postPhone = async (phoneNumber: string) => {
  return await privateApi.post(`/api/v1/auth/send-code`, {
    phoneNumber,
  });
};
