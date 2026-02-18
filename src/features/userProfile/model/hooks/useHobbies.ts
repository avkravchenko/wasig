import { useDebounce } from "@/shared/lib";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllHobbies } from "../../api/getAllHobbies";
import { getHobbiesByCategory } from "../../api/getHobbiesByCategory";
import { CustomHobby } from "../types";
import { postUserInterests } from "../../api/postUserInterests";
import { PostUserInterestsRequest } from "../../api/types";
import normalizeHobbies from "../../helpers/normalizeHobby";
import generateHobby from "../../helpers/customHobbyFactory";

const useHobbies = (
  setVisible: (visible: boolean) => void,
  onNextStep: () => void
) => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const [selectedHobbies, setSelectedHobbies] = useState<Set<number>>(
    new Set()
  );

  const [customHobbyInput, setCustomHobbyInput] = useState<string>("");
  const debouncedCustomHobbyInput = useDebounce(customHobbyInput, 200);

  const [customHobbyToDisplay, setCustomHobbyToDisplay] = useState<
    CustomHobby[]
  >([]);
  const [selectedCustomHobbies, setSelectedCustomHobbies] = useState<
    Set<string>
  >(new Set());

  const hobbiesQuery = useQuery({
    queryKey: ["hobbies", debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch) {
        const result = await getAllHobbies(debouncedSearch);
        return normalizeHobbies(result.data);
      } else {
        const result = await getHobbiesByCategory();
        return result.data;
      }
    },
    enabled: true,
  });

  const submitInterests = () => {
    const request: PostUserInterestsRequest = {
      interestIds: Array.from(selectedHobbies),
    };

    if (selectedCustomHobbies.size > 0) {
      request.customInterests = customHobbyToDisplay.map((hobby) => hobby.name);
    }

    submitInterestsMutation.mutate(request);
  };

  const trimmedInput = debouncedCustomHobbyInput.trim().toLowerCase();

  const isCustomHobbyUnique =
    !trimmedInput ||
    !customHobbyToDisplay.some(
      (item) => item.name.toLowerCase() === trimmedInput
    );

  const addCustomHobby = () => {
    if (!customHobbyInput.trim() || !isCustomHobbyUnique) return;

    const newCustomHobby = generateHobby(customHobbyInput);

    setCustomHobbyToDisplay((prev) => [...prev, newCustomHobby]);
    resetModal();
  };

  const selectCustomHobby = (hobby: CustomHobby) => {
    setSelectedCustomHobbies((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(hobby.id)) {
        newSet.delete(hobby.id);
      } else {
        newSet.add(hobby.id);
      }
      return newSet;
    });
  };

  const resetModal = () => {
    setVisible(false);
    resetCustomHobbyInput();
  };

  const resetCustomHobbyInput = () => {
    setCustomHobbyInput("");
  };

  const submitInterestsMutation = useMutation({
    mutationFn: (request: PostUserInterestsRequest) =>
      postUserInterests(request),
    onSuccess: () => {
      onNextStep();
    },
    onError: (error) => {
      console.error("Error submitting interests:", error);
    },
  });

  return {
    search,
    selectedHobbies,
    selectedCustomHobbies,
    customHobbyInput,
    customHobbyToDisplay,
    hobbies: hobbiesQuery.data || [],
    isSubmitting: submitInterestsMutation.isPending,
    submitError: submitInterestsMutation.error,
    isLoading: hobbiesQuery.isLoading,
    isError: hobbiesQuery.isError,
    error: hobbiesQuery.error,
    isCustomHobbyUnique,
    addCustomHobby,
    selectCustomHobby,
    setSearch,
    setSelectedHobbies,
    setSelectedCustomHobbies,
    setCustomHobbyInput,
    submitInterests,
    resetModal,
  };
};

export default useHobbies;
