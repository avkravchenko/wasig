import { privateApi } from "@/shared/api/privateApi";
import { PostUserInterestsRequest } from "./types";

export const postUserInterests = async (
  interests: PostUserInterestsRequest
) => {
  return await privateApi.post("/api/v1/onboarding/interests", interests);
};
