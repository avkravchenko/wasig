import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@/shared/routes/types";
import ROUTER_NAME_SPACES from "@/shared/routes";

const useDefinePhoneNumber = () => {
  const navigation = useNavigation<NavigationProp>();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
    //TODO: fix regex
    const phoneRegex = /^\[1-9]\d{11}$/;

    setIsPhoneNumberValid(
      phoneNumber.length > 0 && phoneRegex.test(phoneNumber),
    );
  };

  const handlePhoneNumberPress = () => {
    // navigation.navigate(ROUTER_NAME_SPACES.SMS_STEP.NAME);
  };

  return {
    phoneNumber,
    isPhoneNumberValid,
    isPhoneNumberFocused,
    handlePhoneNumberChange,
    handlePhoneNumberPress,
  };
};

export default useDefinePhoneNumber;
