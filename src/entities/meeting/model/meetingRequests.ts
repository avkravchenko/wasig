export type MeetingRequest = {
  id: string;
  name: string;
  age: number;
  isOnline: boolean;
  title: string;
  description: string;
};

export const MEETING_REQUESTS: MeetingRequest[] = [
  {
    id: "1",
    name: "Анна",
    age: 32,
    isOnline: true,
    title: "Прогулка и смолток",
    description:
      "О большом, о вечном, о бесконечном. Короче говоря, мне нужна компания...",
  },
  {
    id: "2",
    name: "Анна",
    age: 32,
    isOnline: true,
    title: "Прогулка и смолток",
    description:
      "О большом, о вечном, о бесконечном. Короче говоря, мне нужна компания...",
  },
];
