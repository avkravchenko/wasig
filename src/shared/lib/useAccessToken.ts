import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleSetAccessToken = async (accessToken: string) => {
    await AsyncStorage.setItem("accessToken", accessToken);
    setAccessToken(accessToken);
  };

  const handleGetAccessToken = async () => {
    return accessToken || (await AsyncStorage.getItem("accessToken"));
  };

  const handleRemoveAccessToken = async () => {
    await AsyncStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  return {
    accessToken,
    handleSetAccessToken,
    handleGetAccessToken,
    handleRemoveAccessToken,
  };
};

export default useAccessToken;
