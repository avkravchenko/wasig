import { useQuery } from "@tanstack/react-query";
import { extractFeedCards, getFeedCards } from "../../api/getFeedCards";
import { FeedCardsQuery } from "../types/feed";

const useFeed = ({
  page = 0,
  size = 20,
  latitude,
  longitude,
}: Omit<FeedCardsQuery, "signal"> = {}) => {
  const feedQuery = useQuery({
    queryKey: ["feed", page, size, latitude, longitude],
    queryFn: async ({ signal }) => {
      const response = await getFeedCards({
        page,
        size,
        latitude,
        longitude,
        signal,
      });
      return extractFeedCards(response);
    },
  });

  return {
    data: feedQuery.data || [],
    isLoading: feedQuery.isLoading,
    isError: feedQuery.isError,
    error: feedQuery.error,
    refetch: feedQuery.refetch,
  };
};

export default useFeed;
