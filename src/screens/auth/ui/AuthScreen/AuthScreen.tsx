import LoginEntryPoint from "@/features/login/ui/LoginEntryPoint";
import useSelectAuthWay from "@/features/login/model/hooks/useSelectAuthWay";
import { AuthWithPhone } from "@/features/login";

const AuthScreen = () => {
  const { authWay, selectAuthWay } = useSelectAuthWay();

  if (authWay === "phone") {
    return <AuthWithPhone />;
  }

  return <LoginEntryPoint selectAuthWay={selectAuthWay} />;
};

export default AuthScreen;
