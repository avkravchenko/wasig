import { View, Text } from "react-native";
import { useState } from "react";
import UserName from "@/features/userProfile/ui/UserName";
import UserBirthDay from "@/features/userProfile/ui/UserBirthDay";
import UserHomeTown from "@/features/userProfile/ui/UserHomeTown";
import UserSex from "@/features/userProfile/ui/UserSex";
import ErrorComponent from "@/shared/ui/ErrorComponent/ErrorComponent";

const UserProfileStepper = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1: {
      return <UserName onNextStep={handleNextStep} />;
      break;
    }
    case 2: {
      return (
        <UserBirthDay onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
      );
    }
    case 3: {
      return (
        <UserHomeTown onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
      );
    }
    case 4: {
      return (
        <UserSex onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
      );
    }
    default: {
      return <ErrorComponent />;
    }
  }
};

export default UserProfileStepper;
