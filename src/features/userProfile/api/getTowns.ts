import { privateApi } from "@/shared/api/privateApi";

export const getTowns = async (query: string, signal?: AbortSignal) => {
  return await privateApi.get("/api/v1/onboarding/cities", {
    params: { query },
    signal,
  });
};
