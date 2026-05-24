import { privateApi } from "@/shared/api/privateApi";
import { CreateActivityRequest } from "../model/types/activity";

export const createActivity = async (
  payload: CreateActivityRequest,
): Promise<void> => {
  await privateApi.post("/api/v1/feed/activities", payload);
};
