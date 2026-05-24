export type MeetingRequest = {
  id: string;
  name: string;
  age: number;
  isOnline: boolean;
  photoUrl: string;
  periodLabel: string;
  distanceLabel: string;
  title: string;
  description: string;
  tags: string[];
};

export const MEETING_REQUESTS: MeetingRequest[] = [
  {
    id: "1",
    name: "Анна",
    age: 32,
    isOnline: true,
    photoUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    periodLabel: "На неделе",
    distanceLabel: "13 км от вас",
    title: "Прогулка и смолток",
    description:
      "О большом, о вечном, о бесконечном. Короче говоря, мне нужна компания...",
    tags: [
      "Кино под луной",
      "Кино под луной",
      "Кино под луной",
      "Бары",
      "Бары",
      "Письмо по голубиной почте",
    ],
  },
  {
    id: "2",
    name: "Маша",
    age: 27,
    isOnline: false,
    photoUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    periodLabel: "Сегодня",
    distanceLabel: "7 км от вас",
    title: "Кофе и болтовня в центре",
    description:
      "Хочется выбраться из рутины, выпить что-нибудь вкусное и просто хорошо поговорить.",
    tags: ["Кофе", "Прогулка", "Центр", "Новые знакомства"],
  },
];

export const getMeetingRequestById = (meetingRequestId: string) => {
  return MEETING_REQUESTS.find((request) => request.id === meetingRequestId);
};
