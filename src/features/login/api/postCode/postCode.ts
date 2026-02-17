import { publicApi } from "@/shared/api/publicApi";

export const postCode = async (body: { phoneNumber: string; code: string }) => {
  return await publicApi.post("/api/v1/auth/verify-code", body);
};
