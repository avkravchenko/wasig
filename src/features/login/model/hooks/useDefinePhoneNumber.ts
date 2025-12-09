import { useEffect, useState } from "react";

import phoneSchema from "../schema/schema";

const useDefinePhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  useEffect(() => {
    if (phoneNumber.length < 11) {
      setIsPhoneNumberValid(true);
      return;
    }

    setIsPhoneNumberValid(phoneSchema.isValidSync(phoneNumber));
  }, [phoneNumber]);

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
  };

  return {
    phoneNumber,
    isPhoneNumberValid,
    handlePhoneNumberChange,
  };
};

export default useDefinePhoneNumber;
