import { useState } from "react";
import useCustomHobbies from "./useCustomHobbies";
import useHobbiesQuery from "./useHobbiesQuery";
import useHobbiesSelection from "./useHobbiesSelection";
import useSubmitInterests from "./useSubmitInterests";

const useHobbies = (
  setVisible: (visible: boolean) => void,
  onNextStep: () => void,
) => {
  const [search, setSearch] = useState<string>("");
  const hobbiesQuery = useHobbiesQuery(search);
  const {
    customHobbyInput,
    customHobbyToDisplay,
    selectedCustomHobbies,
    isCustomHobbyUnique,
    addCustomHobby,
    selectCustomHobby,
    setCustomHobbyInput,
    setSelectedCustomHobbies,
    resetModal,
  } = useCustomHobbies(setVisible);
  const { selectedHobbies, setSelectedHobbies, buildInterestsRequest } =
    useHobbiesSelection();
  const { submitInterests: submit, isSubmitting, submitError } =
    useSubmitInterests(onNextStep);

  const submitInterests = () => {
    const request = buildInterestsRequest({
      customHobbyToDisplay,
      selectedCustomHobbies,
    });

    submit(request);
  };

  return {
    search,
    selectedHobbies,
    selectedCustomHobbies,
    customHobbyInput,
    customHobbyToDisplay,
    hobbies: hobbiesQuery.hobbies,
    isSubmitting,
    submitError,
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
