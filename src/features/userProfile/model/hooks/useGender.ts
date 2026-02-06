import { useState } from "react";
import { postUserGender } from "@/features/userProfile/api/postUserGender";

const useGender = (onNextStep: () => void) => {
    const [gender, setGender] = useState<string>("");
    const [genders, setGenders] = useState<
    { sex: string; label: string; selected: boolean }[]
  >([
    { sex: "male", label: "Мужчина", selected: false },
    { sex: "female", label: "Женщина", selected: false },
  ]);

  const handleGenderSelect = (text: string) => {
    setGenders(
      genders.map((item) => ({ ...item, selected: item.sex === text })),
    );

    setGender(text);
  };

  const submitGender = async () => {
    try {
      await postUserGender(gender.toUpperCase());
      onNextStep();
    } catch (error) {
      console.log(error);
    }
  }

  return {
    genders,
    handleGenderSelect,
    submitGender,
  };
}

export default useGender;   