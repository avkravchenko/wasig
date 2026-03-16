import { useQuery } from "@tanstack/react-query";
import { getFeedFilterOptions } from "../../api/getFeedFilterOptions";

const useFeedFilterOptions = () => {
  const query = useQuery({
    queryKey: ["feed-filter-options"],
    queryFn: ({ signal }) => getFeedFilterOptions(signal),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    options: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export default useFeedFilterOptions;
