import { useCallback, useState } from "react";

const useCurrentStep = () => {
  const [step, setStep] = useState(1);

  const nextStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  return {
    step,
    nextStep,
  };
};

export default useCurrentStep;
