import AuthWithPhoneStepOne from "./AuthWithPhoneStepOne";
import useCurrentStep from "../model/hooks/useCurrentStep";
import AuthWithPhoneStepTwo from "./AuthWithPhoneStepTwo";
import useDefinePhoneNumber from "../model/hooks/useDefinePhoneNumber";

interface AuthWithPhoneProps {
  onCodeConfirmed: () => void;
}

const AuthWithPhone = ({ onCodeConfirmed }: AuthWithPhoneProps) => {
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
        onCodeConfirmed={onCodeConfirmed}
      />
    );
  }
};

export default AuthWithPhone;
