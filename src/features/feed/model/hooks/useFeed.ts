import { useQuery } from "@tanstack/react-query";
import { extractFeedCards, getFeedCards } from "../../api/getFeedCards";
import { FeedCardsQuery } from "../types/feed";
import { useFeedFilterStore } from "@/features/feedFilter";

const useFeed = ({
  page = 0,
  size = 20,
  latitude,
  longitude,
}: Omit<FeedCardsQuery, "signal" | "filters" | "defaults"> = {}) => {
  const filters = useFeedFilterStore((state) => state.applied);
  const defaults = useFeedFilterStore((state) => state.defaults);

  const feedQuery = useQuery({
    queryKey: ["feed", filters, defaults, page, size, latitude, longitude],
    queryFn: async ({ signal }) => {
      const response = await getFeedCards({
        filters,
        defaults,
        page,
        size,
        latitude,
        longitude,
        signal,
      });
      return extractFeedCards(response);
    },
    retry: false,
    refetchOnWindowFocus: false,
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
