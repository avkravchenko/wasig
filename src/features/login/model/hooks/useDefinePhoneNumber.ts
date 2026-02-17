import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import phoneSchema from "../schema/phoneSchema";
import { postPhone } from "../../api/postPhone/postPhone";
import { normalizeApiError } from "@/shared/api/errors";

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

  const { mutate: postPhoneMutation } = useMutation({
    mutationFn: postPhone,
    onSuccess: () => {
      if (step === 1) nextStep();
    },
    onError: (error) => {
      const apiError = normalizeApiError(error);
      console.error(
        `Send code failed [${apiError.code}] (${apiError.status}): ${apiError.message}`,
      );
    },
  });

  function handleSubmitPhoneNumber() {
    if (!isPhoneNumberValid || !phoneNumber) return;

    postPhoneMutation(phoneNumber);
  }

  return {
    phoneNumber,
    isPhoneNumberValid,
    handlePhoneNumberChange,
    handleSubmitPhoneNumber,
  };
};

export default useDefinePhoneNumber;
