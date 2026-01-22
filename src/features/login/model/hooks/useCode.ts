import { useEffect, useState, useCallback } from "react";
import { postCode } from "@/features/login/api";
import useAccessToken from "@/shared/lib/useAccessToken";
import useRefreshToken from "@/shared/lib/useRefreshToken";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ROUTER_NAME_SPACES from "@/shared/routes";

type RootStackParamList = {
  [ROUTER_NAME_SPACES.USER_PROFILE.NAME]: undefined;
};

const useCode = (phoneNumber: string) => {
  const { handleSetAccessToken } = useAccessToken();
  const { handleSetRefreshToken } = useRefreshToken();
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  const [code, setCode] = useState("");
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCodeSubmit = useCallback((text: string) => {
    setCode(text);
  }, []);

  const handleCodeVerify = async () => {
    try {
      setIsCodeLoading(true);

      const requestBody = {
        phoneNumber: phoneNumber,
        code: code,
      };

      const response = await postCode(requestBody);

      if (response.status == 200) {
        setIsCodeConfirmed(true);

        await handleSetAccessToken(response.data.accessToken);
        await handleSetRefreshToken(response.data.refreshToken);
        navigation.navigate(ROUTER_NAME_SPACES.USER_PROFILE.NAME);
      }
      setIsCodeLoading(false);
    } catch (error) {
      console.log(error);

      setIsCodeConfirmed(false);
      console.log(isCodeConfirmed);
    } finally {
      setIsCodeLoading(false);
    }
  };

  useEffect(() => {
    handleCodeVerify();
  }, [code]);

  return {
    code,
    isCodeLoading,
    isCodeConfirmed,
    handleCodeSubmit,
    handleCodeVerify,
  };
};

export default useCode;
