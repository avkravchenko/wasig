import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  newUsername: boolean;
  phoneNumber: string;
  profileCompleted: boolean;
};

const useUserData = () => {
  const [userData, setUserData] = useState<User | null>(null);

  const handleUserDataChange = async (userData: User) => {
    setUserData(userData);
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  };

  const handleRemoveUserData = async () => {
    setUserData(null);
    await AsyncStorage.removeItem("userData");
  };

  return {
    userData,
    handleUserDataChange,
    handleRemoveUserData,
  };
};

export default useUserData;
