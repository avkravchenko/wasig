import { useState, useCallback } from "react";
import UserName from "@/features/userProfile/ui/UserName";
import UserBirthDay from "@/features/userProfile/ui/UserBirthDay";
import UserHomeTown from "@/features/userProfile/ui/UserHomeTown";
import UserSex from "@/features/userProfile/ui/UserSex";
import UserHobbies from "@/features/userProfile/ui/UserHobbies";
import UserMeetingGoal from "@/features/userProfile/ui/UserMeetingGoal";
import UserCommunicationStyle from "@/features/userProfile/ui/UserCommunicationStyle";
import UserExpectations from "@/features/userProfile/ui/UserExpectations";
import UserPhotos from "@/features/userProfile/ui/UserPhotos";
import ErrorComponent from "@/shared/ui/ErrorComponent";
import UserFinish from "@/features/userProfile/ui/UserFinish";

const UserProfileStepper = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);

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
    case 6: {
      return <UserMeetingGoal onNextStep={handleNextStep} />;
    }
    case 7: {
      return <UserCommunicationStyle onNextStep={handleNextStep} />;
    }
    case 8: {
      return <UserExpectations onNextStep={handleNextStep} />;
    }
    case 9: {
      return <UserPhotos onNextStep={handleNextStep} />;
    }
    case 10: {
      return <UserFinish />;
    }
    default: {
      return <ErrorComponent />;
    }
  }
};

export default UserProfileStepper;
