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
};
