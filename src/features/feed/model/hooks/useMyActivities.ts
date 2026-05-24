import { useQuery } from "@tanstack/react-query";
import { extractFeedCards, getMyActivities } from "../../api/getFeedCards";

const useMyActivities = ({ enabled = true }: { enabled?: boolean } = {}) => {
  const activitiesQuery = useQuery({
    enabled,
    queryKey: ["feed", "my-activities"],
    queryFn: async ({ signal }) => {
      const response = await getMyActivities({ signal });
      return extractFeedCards(response);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    data: activitiesQuery.data || [],
    isLoading: activitiesQuery.isLoading,
    isError: activitiesQuery.isError,
    error: activitiesQuery.error,
    refetch: activitiesQuery.refetch,
  };
};

export default useMyActivities;
