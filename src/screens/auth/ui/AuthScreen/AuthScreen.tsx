import {
  AuthWithPhone,
  LoginEntryPoint,
  useSelectAuthWay,
} from "@/features/login";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AuthScreenStackParamList = {
  "user-profile": undefined;
};

const AuthScreen = () => {
  const { authWay, selectAuthWay } = useSelectAuthWay();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthScreenStackParamList>>();

  const handleCodeConfirmed = () => {
    navigation.replace("user-profile");
  };

  if (authWay === "phone") {
    return <AuthWithPhone onCodeConfirmed={handleCodeConfirmed} />;
  }

  return <LoginEntryPoint selectAuthWay={selectAuthWay} />;
};

export default AuthScreen;
