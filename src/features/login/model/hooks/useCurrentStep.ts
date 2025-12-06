import { useState } from "react";

const useCurrentStep = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  return {
    step,
    nextStep,
  };
};

export default useCurrentStep;
