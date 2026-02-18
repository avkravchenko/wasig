import { useFocus } from "@/shared/lib";
import { useState } from "react";
import { postExpectations } from "../../api/postExpectations";

const useExpectations = ({ onNextStep }: { onNextStep: () => void }) => {
  const [expectations, setExpectations] = useState<string>("");
  const inputRef = useFocus();

  const handleExpectationsChange = (text: string) => {
    setExpectations(text);
  };

  const submitExpectations = async () => {
    try {
      await postExpectations(expectations);
      onNextStep();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    expectations,
    inputRef,
    handleExpectationsChange,
    submitExpectations,
  };
};

export default useExpectations;
