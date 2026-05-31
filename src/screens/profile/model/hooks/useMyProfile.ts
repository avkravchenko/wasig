import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../../api/getMyProfile";

export const MY_PROFILE_QUERY_KEY = ["my-profile", "api-v1-users-me-profile"];

const useMyProfile = () => {
  const query = useQuery({
    queryKey: MY_PROFILE_QUERY_KEY,
    queryFn: ({ signal }) => getMyProfile(signal),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    profile: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export default useMyProfile;
