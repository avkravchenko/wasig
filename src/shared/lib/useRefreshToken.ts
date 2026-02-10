import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useRefreshToken = () => {
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const handleSetRefreshToken = useCallback(async (token: string) => {
    await AsyncStorage.setItem("refreshToken", token);
    setRefreshToken(token);
  }, []);

  const handleRemoveRefreshToken = useCallback(async () => {
    await AsyncStorage.removeItem("refreshToken");
    setRefreshToken(null);
  }, []);

  return {
    refreshToken,
    handleSetRefreshToken,
    handleRemoveRefreshToken,
  };
};

export default useRefreshToken;
