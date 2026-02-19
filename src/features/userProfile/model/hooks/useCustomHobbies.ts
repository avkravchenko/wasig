import { useDebounce } from "@/shared/lib";
import { useState } from "react";
import { CustomHobby } from "../types";
import generateHobby from "../../helpers/customHobbyFactory";

const useCustomHobbies = (setVisible: (visible: boolean) => void) => {
  const [customHobbyInput, setCustomHobbyInput] = useState<string>("");
  const debouncedCustomHobbyInput = useDebounce(customHobbyInput, 200);
  const [customHobbyToDisplay, setCustomHobbyToDisplay] = useState<
    CustomHobby[]
  >([]);
  const [selectedCustomHobbies, setSelectedCustomHobbies] = useState<
    Set<string>
  >(new Set());

  const trimmedInput = debouncedCustomHobbyInput.trim().toLowerCase();
  const isCustomHobbyUnique =
    !trimmedInput ||
    !customHobbyToDisplay.some(
      (item) => item.name.toLowerCase() === trimmedInput,
    );

  const resetCustomHobbyInput = () => {
    setCustomHobbyInput("");
  };

  const resetModal = () => {
    setVisible(false);
    resetCustomHobbyInput();
  };

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

  return {
    customHobbyInput,
    customHobbyToDisplay,
    selectedCustomHobbies,
    isCustomHobbyUnique,
    addCustomHobby,
    selectCustomHobby,
    setCustomHobbyInput,
    setSelectedCustomHobbies,
    resetModal,
  };
};

export default useCustomHobbies;
