import {
  AuthWithPhone,
  LoginEntryPoint,
  useSelectAuthWay,
} from "@/features/login";

const AuthScreen = () => {
  const { authWay, selectAuthWay } = useSelectAuthWay();

  if (authWay === "phone") {
    return <AuthWithPhone />;
  }

  return <LoginEntryPoint selectAuthWay={selectAuthWay} />;
};

export default AuthScreen;
