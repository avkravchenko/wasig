import { useDebounce } from "@/shared/lib";
import { useQuery } from "@tanstack/react-query";
import { getAllHobbies } from "../../api/getAllHobbies";
import { getHobbiesByCategory } from "../../api/getHobbiesByCategory";
import normalizeHobbies from "../../helpers/normalizeHobby";

const useHobbiesQuery = (search: string) => {
  const debouncedSearch = useDebounce(search, 500);

  const hobbiesQuery = useQuery({
    queryKey: ["hobbies", debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch) {
        const result = await getAllHobbies(debouncedSearch);
        return normalizeHobbies(result.data);
      }

      const result = await getHobbiesByCategory();
      return result.data;
    },
    enabled: true,
  });

  return {
    hobbies: hobbiesQuery.data || [],
    isLoading: hobbiesQuery.isLoading,
    isError: hobbiesQuery.isError,
    error: hobbiesQuery.error,
  };
};

export default useHobbiesQuery;
