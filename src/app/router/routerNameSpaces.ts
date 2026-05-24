import { CHAT_CONVERSATION_ROUTE } from "@/screens/chats/model/types";
import { MEETING_REQUEST_ROUTE } from "@/screens/meetings/model/types";

export const ROUTER_NAME_SPACES = {
  SMS_STEP: {
    NAME: "sms-step",
    SCREEN: "sms-step",
  },
  LOGIN_ENTRY_POINT: {
    NAME: "login-entry-point",
    SCREEN: "login-entry-point",
  },
  USER_PROFILE: {
    NAME: "user-profile",
    SCREEN: "user-profile",
  },
  MY_PROFILE: {
    NAME: "my-profile",
    SCREEN: "my-profile",
  },
  SETTINGS: {
    NAME: "settings",
    SCREEN: "settings",
  },
  HOME: {
    NAME: "home",
    SCREEN: "home",
  },
  CHAT_CONVERSATION: {
    NAME: CHAT_CONVERSATION_ROUTE,
    SCREEN: CHAT_CONVERSATION_ROUTE,
  },
  MEETING_REQUEST: {
    NAME: MEETING_REQUEST_ROUTE,
    SCREEN: MEETING_REQUEST_ROUTE,
  },
};
