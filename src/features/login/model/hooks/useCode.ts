import { useState, useCallback } from "react";
import { postCode } from "../../api";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ROUTER_NAME_SPACES from "@/shared/routes";
import { setAccessToken, setRefreshToken } from "@/shared/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { normalizeApiError } from "@/shared/api/errors";

type RootStackParamList = {
  [ROUTER_NAME_SPACES.USER_PROFILE.NAME]: undefined;
};

const useCode = (phoneNumber: string) => {
  const [code, setCode] = useState("");

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (variables: { phoneNumber: string; code: string }) =>
      postCode(variables),
    onSuccess: async (response) => {
      await setAccessToken(response.data.accessToken);
      await setRefreshToken(response.data.refreshToken);

      navigation.replace(ROUTER_NAME_SPACES.USER_PROFILE.NAME);
    },
    onError: (error) => {
      const apiError = normalizeApiError(error);
      console.error(
        `Verification failed [${apiError.code}] (${apiError.status}): ${apiError.message}`,
      );
    },
  });

  const handleCodeSubmit = useCallback(
    (text: string) => {
      setCode(text);

      if (isPending) return;

      if (text.length === 4) {
        mutate({
          phoneNumber,
          code: text,
        });
      }
    },
    [phoneNumber, isPending, mutate],
  );

  return {
    code,
    isCodeLoading: isPending,
    isCodeConfirmed: isSuccess,
    isCodeError: isError,
    handleCodeSubmit,
  };
};

export default useCode;
