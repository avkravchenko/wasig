import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTER_NAME_SPACES } from "./routerNameSpaces";

export type RootStackParamList = {
  [ROUTER_NAME_SPACES.LOGIN_ENTRY_POINT.NAME]: undefined;
  [ROUTER_NAME_SPACES.SMS_STEP.NAME]: undefined;
};
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
