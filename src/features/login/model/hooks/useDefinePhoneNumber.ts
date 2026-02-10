import { useCallback, useEffect, useState } from "react";
import phoneSchema from "../schema/phoneSchema";
import { postPhone } from "@/features/login/api/postPhone/postPhone";

const useDefinePhoneNumber = (nextStep: () => void, step: number) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  useEffect(() => {
    const isValid = phoneSchema.isValidSync(phoneNumber);
    setIsPhoneNumberValid(isValid);
  }, [phoneNumber]);

  const handlePhoneNumberChange = useCallback((text: string) => {
    setPhoneNumber(text);
  }, []);

  async function handleSubmitPhoneNumber() {
    if (!isPhoneNumberValid || !phoneNumber) return;

    try {
      await postPhone(phoneNumber);
      if (step === 1) nextStep(); 
    } catch (error) {
      console.error(error);
    }
  }

  return {
    phoneNumber,
    isPhoneNumberValid,
    handlePhoneNumberChange,
    handleSubmitPhoneNumber,
  };
};

export default useDefinePhoneNumber;
