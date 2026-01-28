import { useState, useEffect } from "react";
import { useDebounce } from "@/shared/lib";
import postUserTown from "../../api/postUserTown";
import getTowns from "../../api/getTowns";
import { Town } from "../types";

const useTown = (onNextStep: () => void) => {
  const [searchHomeTown, setSearchHomeTown] = useState("");
  const debouncedHomeTown = useDebounce(searchHomeTown, 500);

  const [towns, setTowns] = useState<Town[]>([]);
  const [selectedTown, setSelectedTown] = useState<Town | null>(null);

  const handleSelectTown = (town: Town) => {
    setSelectedTown((prev) => (prev?.id === town.id ? null : town));
  };

  const submitUserHomeTown = async () => {
    if (!selectedTown?.id) return;

   const response = await postUserTown(selectedTown?.id);

   if (response.status === 200) {
    console.log(response);
    
    onNextStep();
   }
  }

  useEffect(() => {
    const fetchTowns = async () => {
      const result = await getTowns(debouncedHomeTown);
      if (result.status === 200) {
        setTowns(result.data);
      }
    };

    fetchTowns();
  }, [debouncedHomeTown]);

  return {
    searchHomeTown,
    towns,
    selectedTown,
    handleSelectTown,
    setSearchHomeTown,
    submitUserHomeTown,
  }
}

export default useTown;