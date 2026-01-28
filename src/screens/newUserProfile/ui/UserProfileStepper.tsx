import { useState } from "react";
import UserName from "@/features/userProfile/ui/UserName";
import UserBirthDay from "@/features/userProfile/ui/UserBirthDay";
import UserHomeTown from "@/features/userProfile/ui/UserHomeTown";
import UserSex from "@/features/userProfile/ui/UserSex";
import UserHobbies from "@/features/userProfile/ui/UserHobbies";
import ErrorComponent from "@/shared/ui/ErrorComponent";

const UserProfileStepper = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  switch (step) {
    case 1: {
      return <UserName onNextStep={handleNextStep} />;
    }
    case 2: {
      return <UserBirthDay onNextStep={handleNextStep} />;
    }
    case 3: {
      return <UserSex onNextStep={handleNextStep} />;
    }
    case 4: {
      return <UserHomeTown onNextStep={handleNextStep} />;
    }
    case 5: {
      return <UserHobbies onNextStep={handleNextStep} />;
    }
    default: {
      return <ErrorComponent />;
    }
  }
};

export default UserProfileStepper;
