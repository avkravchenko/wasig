import { ChatItem } from "./types";

export const CHAT_ITEMS: ChatItem[] = [
  {
    id: "1",
    name: "Анна",
    age: 32,
    subtitle: "Текст / Состояние (Печатает..)",
    time: "00:00",
    unreadCount: "1",
    isOnline: true,
    isNew: true,
    avatarKind: "letter",
  },
  {
    id: "2",
    name: "Алексей",
    age: 31,
    subtitle: "Текст / Состояние (Печатает..)",
    time: "00:00",
    unreadCount: "99+",
    isNew: true,
    avatarKind: "photo",
  },
  {
    id: "3",
    name: "Лизок на разок",
    age: 19,
    subtitle: "Текст / Состояние (Печатает..)",
    time: "00:00",
    isOnline: true,
    avatarKind: "letter",
  },
  {
    id: "4",
    name: "Анна",
    age: 32,
    subtitle: "Текст / Состояние (Печатает..)",
    time: "Вчера",
    isOnline: true,
    avatarKind: "letter",
  },
];
