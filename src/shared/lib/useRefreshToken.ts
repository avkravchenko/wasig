import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useRefreshToken = () => {
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const handleSetRefreshToken = async (refreshToken: string) => {
    await AsyncStorage.setItem("refreshToken", refreshToken);
    setRefreshToken(refreshToken);
  };

  const handleRemoveRefreshToken = async () => {
    await AsyncStorage.removeItem("refreshToken");
    setRefreshToken(null);
  };

  return {
    refreshToken,
    handleSetRefreshToken,
    handleRemoveRefreshToken,
  };
};

export default useRefreshToken;
