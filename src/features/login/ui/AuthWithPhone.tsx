import AuthWithPhoneStepOne from "./AuthWithPhoneStepOne";
import useCurrentStep from "../model/hooks/useCurrentStep";
import AuthWithPhoneStepTwo from "./AuthWithPhoneStepTwo";

const AuthWithPhone = () => {
  const { step, nextStep } = useCurrentStep();

  if (step === 1) {
    return <AuthWithPhoneStepOne nextStep={nextStep} />;
  }

  if (step === 2) {
    return <AuthWithPhoneStepTwo />;
  }
};

export default AuthWithPhone;
