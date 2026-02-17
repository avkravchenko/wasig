import { privateApi } from "@/shared/api/privateApi";

export const getAllHobbies = async (query: string, signal?: AbortSignal) => {
  return await privateApi.get("/api/v1/onboarding/interests", {
    params: { query },
    signal,
  });
};
