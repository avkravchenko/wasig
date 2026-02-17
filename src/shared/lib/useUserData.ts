import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/entities/user";

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
