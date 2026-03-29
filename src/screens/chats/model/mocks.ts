import { ChatItem, ChatThread } from "./types";

export const CHAT_THREADS: ChatThread[] = [
  {
    id: "1",
    name: "Анна",
    age: 32,
    subtitle: "Wanna lunch for me?",
    time: "12:20",
    unreadCount: "1",
    isOnline: true,
    isNew: true,
    avatarKind: "letter",
    avatarLabel: "А",
    messages: [
      {
        id: "1-1",
        text: "Wanna lunch for me?",
        time: "12:20",
        isOutgoing: false,
      },
      {
        id: "1-2",
        text: "Привет, не бойся я друг, я не обижу тебя",
        time: "12:20",
        isOutgoing: true,
        status: "read",
      },
    ],
  },
  {
    id: "2",
    name: "Алексей",
    age: 31,
    subtitle: "Печатает...",
    time: "09:41",
    unreadCount: "99+",
    isNew: true,
    avatarKind: "photo",
    avatarLabel: "А",
    messages: [
      {
        id: "2-1",
        text: "Привет! Ты уже добралась?",
        time: "09:20",
        isOutgoing: false,
      },
      {
        id: "2-2",
        text: "Да, я на месте. Закажу нам кофе?",
        time: "09:24",
        isOutgoing: true,
        status: "sent",
      },
    ],
  },
  {
    id: "3",
    name: "Лизок на разок",
    age: 19,
    subtitle: "У меня сегодня окно после шести",
    time: "Вчера",
    isOnline: true,
    avatarKind: "letter",
    avatarLabel: "Л",
    messages: [
      {
        id: "3-1",
        text: "У меня сегодня окно после шести",
        time: "18:14",
        isOutgoing: false,
      },
    ],
  },
  {
    id: "4",
    name: "Анна",
    age: 32,
    subtitle: "Скинула тебе адрес",
    time: "Вчера",
    isOnline: true,
    avatarKind: "letter",
    avatarLabel: "А",
    messages: [
      {
        id: "4-1",
        text: "Скинула тебе адрес",
        time: "22:07",
        isOutgoing: false,
      },
      {
        id: "4-2",
        text: "Вижу, спасибо",
        time: "22:10",
        isOutgoing: true,
        status: "read",
      },
    ],
  },
];

export const CHAT_ITEMS: ChatItem[] = CHAT_THREADS.map(({ messages, ...chat }) => chat);

export const getChatThreadById = (chatId: string) =>
  CHAT_THREADS.find((chat) => chat.id === chatId);
