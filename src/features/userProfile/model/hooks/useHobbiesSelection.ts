import { useState } from "react";
import { CustomHobby } from "../types";
import { PostUserInterestsRequest } from "../../api/types";

const useHobbiesSelection = () => {
  const [selectedHobbies, setSelectedHobbies] = useState<Set<number>>(
    new Set(),
  );

  const buildInterestsRequest = ({
    customHobbyToDisplay,
    selectedCustomHobbies,
  }: {
    customHobbyToDisplay: CustomHobby[];
    selectedCustomHobbies: Set<string>;
  }): PostUserInterestsRequest => {
    const request: PostUserInterestsRequest = {
      interestIds: Array.from(selectedHobbies),
    };

    if (selectedCustomHobbies.size > 0) {
      request.customInterests = customHobbyToDisplay
        .filter((hobby) => selectedCustomHobbies.has(hobby.id))
        .map((hobby) => hobby.name);
    }

    return request;
  };

  return {
    selectedHobbies,
    setSelectedHobbies,
    buildInterestsRequest,
  };
};

export default useHobbiesSelection;
