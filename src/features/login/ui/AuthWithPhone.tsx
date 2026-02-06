import AuthWithPhoneStepOne from "./AuthWithPhoneStepOne";
import useCurrentStep from "../model/hooks/useCurrentStep";
import AuthWithPhoneStepTwo from "./AuthWithPhoneStepTwo";
import { useCallback } from "react";
import useDefinePhoneNumber from "../model/hooks/useDefinePhoneNumber";
import useCode from "../model/hooks/useCode";
import { useState } from "react";

const AuthWithPhone = () => {
  const { step, nextStep } = useCurrentStep();
  const {
    phoneNumber,
    isPhoneNumberValid,
    handlePhoneNumberChange,
    postPhoneNumber,
  } = useDefinePhoneNumber(nextStep, step);
  const { isCodeLoading, isCodeConfirmed, handleCodeSubmit } =
    useCode(phoneNumber);
  const [seconds, setSeconds] = useState(60);

  const handleSecondsChange = useCallback((seconds: number) => {
    setSeconds(seconds);
  }, []);

  if (step === 1) {
    return (
      <AuthWithPhoneStepOne
        phoneNumber={phoneNumber}
        isPhoneNumberValid={isPhoneNumberValid}
        handlePhoneNumberChange={handlePhoneNumberChange}
        postPhoneNumber={postPhoneNumber}
      />
    );
  }

  if (step === 2) {
    return (
      <AuthWithPhoneStepTwo
        isCodeConfirmed={isCodeConfirmed}
        isLoading={isCodeLoading}
        seconds={seconds}
        handleSecondsChange={handleSecondsChange}
        handleCodeSubmit={handleCodeSubmit}
        handleResendCode={postPhoneNumber}
      />
    );
  }
};

export default AuthWithPhone;
