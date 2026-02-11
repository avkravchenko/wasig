import { useState, useCallback } from "react";
import { postCode } from "@/features/login/api";
import useRefreshToken from "@/shared/lib/useRefreshToken";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ROUTER_NAME_SPACES from "@/shared/routes";
import { setAccessToken } from "@/shared/lib/auth";
import { useMutation } from "@tanstack/react-query";

type RootStackParamList = {
  [ROUTER_NAME_SPACES.USER_PROFILE.NAME]: undefined;
};

const useCode = (phoneNumber: string) => {
  const { handleSetRefreshToken } = useRefreshToken();
  const [code, setCode] = useState("");
  
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (variables: { phoneNumber: string; code: string }) => 
      postCode(variables),
    onSuccess: async (response) => {
      await setAccessToken(response.data.accessToken);
      await handleSetRefreshToken(response.data.refreshToken);
      
      navigation.navigate(ROUTER_NAME_SPACES.USER_PROFILE.NAME);
    },
    onError: (error) => {
      console.error("Verification failed:", error);
    },
  });

  const handleCodeSubmit = useCallback((text: string) => {
    setCode(text);
    
    if (text.length === 4) {
      mutate({
        phoneNumber,
        code: text,
      });
    }
  }, [phoneNumber, mutate]);

  return {
    code,
    isCodeLoading: isPending,    
    isCodeConfirmed: isSuccess, 
    isCodeError: isError,       
    handleCodeSubmit,
  };
};

export default useCode;
