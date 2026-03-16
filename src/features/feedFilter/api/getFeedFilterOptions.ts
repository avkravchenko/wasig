import { privateApi } from "@/shared/api/privateApi";
import { FeedFilterOptions } from "../model/types";

export const getFeedFilterOptions = async (
  signal?: AbortSignal,
): Promise<FeedFilterOptions> => {
  const response = await privateApi.get<FeedFilterOptions>(
    "/api/v1/feed/filters/options",
    { signal },
  );

  return response.data;
};
