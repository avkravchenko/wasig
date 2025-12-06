import { Text, View, StyleSheet } from "react-native";
import AuthWithPhoneStepOne from "./AuthWithPhoneStepOne";
import useCurrentStep from "../model/hooks/useCurrentStep";

const AuthWithPhone = () => {
  const { step, nextStep } = useCurrentStep();

  if (step === 1) {
    return <AuthWithPhoneStepOne nextStep={nextStep} />;
  }

  // if (step === 2) {
  //   return <AuthWithPhoneStepTwo />;
  // }
};

export default AuthWithPhone;
