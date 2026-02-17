import { privateApi } from "@/shared/api/privateApi";

export const getTowns = async (query: string) => {
  return await privateApi.get("/api/v1/onboarding/cities", {
    params: { query },
  });
};
