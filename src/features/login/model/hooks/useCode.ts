import { useEffect, useState, useCallback } from "react";
import { postCode } from "@/features/login/api";
import useRefreshToken from "@/shared/lib/useRefreshToken";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ROUTER_NAME_SPACES from "@/shared/routes";
import { setAccessToken } from "@/shared/lib/auth";

type RootStackParamList = {
  [ROUTER_NAME_SPACES.USER_PROFILE.NAME]: undefined;
};

const useCode = (phoneNumber: string) => {
  const { handleSetRefreshToken } = useRefreshToken();
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  const [code, setCode] = useState("");
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCodeSubmit = useCallback((text: string) => {
    setCode(text);
  }, []);

  const handleCodeVerify = useCallback(async () => {
    try {
      setIsCodeLoading(true);

      const requestBody = {
        phoneNumber: phoneNumber,
        code: code,
      };

      const response = await postCode(requestBody);
      setIsCodeConfirmed(true);

      await setAccessToken(response.data.accessToken);
      await handleSetRefreshToken(response.data.refreshToken);
      
      navigation.navigate(ROUTER_NAME_SPACES.USER_PROFILE.NAME);
    } catch (error) {
      console.log(error);

      setIsCodeConfirmed(false);
    } finally {
      setIsCodeLoading(false);
    }
  }, [code, phoneNumber, handleSetRefreshToken, navigation]); 

  useEffect(() => {
    handleCodeVerify();
  }, [handleCodeVerify]);

  return {
    code,
    isCodeLoading,
    isCodeConfirmed,
    handleCodeSubmit,
    handleCodeVerify,
  };
};

export default useCode;
