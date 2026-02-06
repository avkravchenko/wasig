import { privateApi } from "@/shared/api/privateApi";

export const postExpectations = async (expectations: string) => {
  return await privateApi.post("/api/v1/onboarding/expectations", {expectations });
};