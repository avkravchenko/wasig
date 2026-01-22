import { useCallback, useEffect, useState } from "react";
import phoneSchema from "../schema/schema";
import postPhone from "@/features/login/api/postPhone/postPhone";

const useDefinePhoneNumber = (nextStep: () => void, step: number) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  useEffect(() => {
    if (phoneNumber.length < 12) {
      setIsPhoneNumberValid(true);
      return;
    }

    setIsPhoneNumberValid(phoneSchema.isValidSync(phoneNumber));
  }, [phoneNumber]);

  const handlePhoneNumberChange = useCallback((text: string) => {
    setPhoneNumber(text);
  }, []);

  async function postPhoneNumber() {
    try {
      await postPhone(phoneNumber);

      if (step == 1) nextStep();
    } catch (error) {
      console.log(error);
    }
  }

  return {
    phoneNumber,
    isPhoneNumberValid,
    handlePhoneNumberChange,
    postPhoneNumber,
  };
};

export default useDefinePhoneNumber;
