import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/shared/lib";
import { postUserTown } from "../../api/postUserTown";
import { getTowns } from "../../api/getTowns";
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

    try {
      await postUserTown(selectedTown?.id);
      onNextStep();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTowns = useCallback(async () => {
    try {
      const result = await getTowns(debouncedHomeTown);
      setTowns(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [debouncedHomeTown]);

  useEffect(() => {
    fetchTowns();
  }, [fetchTowns]);

  return {
    searchHomeTown,
    towns,
    selectedTown,
    handleSelectTown,
    setSearchHomeTown,
    submitUserHomeTown,
  };
};

export default useTown;
