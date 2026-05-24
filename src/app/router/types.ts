import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTER_NAME_SPACES } from "./routerNameSpaces";
import { ChatConversationRouteParams } from "@/screens/chats/model/types";
import { MeetingRequestRouteParams } from "@/screens/meetings/model/types";

export type RootStackParamList = {
  [ROUTER_NAME_SPACES.LOGIN_ENTRY_POINT.NAME]: undefined;
  [ROUTER_NAME_SPACES.SMS_STEP.NAME]: undefined;
  [ROUTER_NAME_SPACES.USER_PROFILE.NAME]: undefined;
  [ROUTER_NAME_SPACES.MY_PROFILE.NAME]: undefined;
  [ROUTER_NAME_SPACES.SETTINGS.NAME]: undefined;
  [ROUTER_NAME_SPACES.HOME.NAME]: undefined;
} & ChatConversationRouteParams &
  MeetingRequestRouteParams;

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
