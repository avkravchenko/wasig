import AuthWithPhoneStepOne from "./AuthWithPhoneStepOne";
import useCurrentStep from "../model/hooks/useCurrentStep";
import AuthWithPhoneStepTwo from "./AuthWithPhoneStepTwo";
import useDefinePhoneNumber from "../model/hooks/useDefinePhoneNumber";

const AuthWithPhone = () => {
  const { step, nextStep } = useCurrentStep();

  const {
    phoneNumber,
    isPhoneNumberValid,
    handlePhoneNumberChange,
    handleSubmitPhoneNumber,
  } = useDefinePhoneNumber(nextStep, step);

  if (step === 1) {
    return (
      <AuthWithPhoneStepOne
        phoneNumber={phoneNumber}
        isPhoneNumberValid={isPhoneNumberValid}
        handlePhoneNumberChange={handlePhoneNumberChange}
        onSubmit={handleSubmitPhoneNumber}
      />
    );
  }

  if (step === 2) {
    return (
      <AuthWithPhoneStepTwo
        phoneNumber={phoneNumber}
        onResendCode={handleSubmitPhoneNumber}
      />
    );
  }
};

export default AuthWithPhone;
