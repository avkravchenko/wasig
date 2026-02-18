import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  UserName,
  UserBirthDay,
  UserHomeTown,
  UserSex,
  UserHobbies,
  UserMeetingGoal,
  UserCommunicationStyle,
  UserExpectations,
  UserPhotos,
  UserFinish,
} from "@/features/userProfile";

import ErrorComponent from "@/shared/ui/ErrorComponent";

type UserProfileStackParamList = {
  home: undefined;
};

const UserProfileStepper = () => {
  const [step, setStep] = useState(1);
  const navigation =
    useNavigation<NativeStackNavigationProp<UserProfileStackParamList>>();

  const handleNextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleGoHome = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: "home" }],
    });
  }, [navigation]);

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
      return <UserFinish onGoHome={handleGoHome} />;
    }
    default: {
      return <ErrorComponent />;
    }
  }
};

export default UserProfileStepper;
