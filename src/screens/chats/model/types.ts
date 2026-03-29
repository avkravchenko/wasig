export type ChatItem = {
  id: string;
  name: string;
  age: number;
  subtitle: string;
  time: string;
  unreadCount?: string;
  isOnline?: boolean;
  isNew?: boolean;
  avatarKind: "letter" | "photo";
  avatarLabel: string;
};

export type ChatMessage = {
  id: string;
  text: string;
  time: string;
  isOutgoing: boolean;
  status?: "sending" | "sent" | "read";
};

export type ChatThread = ChatItem & {
  messages: ChatMessage[];
};

export const CHAT_CONVERSATION_ROUTE = "chat-conversation" as const;

export type ChatConversationRouteParams = {
  [CHAT_CONVERSATION_ROUTE]: {
    chatId: string;
  };
};
