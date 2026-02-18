import { FeedItem } from "@/entities/feed";

const useFeed = () => {
  const mockData: FeedItem[] = [
    {
      userId: "1",
      userName: "Иван Иванович",
      userAge: 25,
      userGender: "male",
      activityTitle: "Сходить в бар",
      activityDescription:
        "О большом, о вечном, о бесконечном. Короч говоря, мне нужна компания...",
      interests: [
        {
          id: 1,
          name: "беседы",
          category: "social",
          isCustom: false,
        },
        {
          id: 2,
          name: "музыка",
          category: "culture",
          isCustom: false,
        },
        {
          id: 3,
          name: "книги",
          category: "culture",
          isCustom: false,
        },
        {
          id: 4,
          name: "искусство",
          category: "culture",
          isCustom: false,
        },
        {
          id: 5,
          name: "фильмы",
          category: "culture",
          isCustom: false,
        },
        {
          id: 6,
          name: "игры",
          category: "leisure",
          isCustom: false,
        },
      ],
      duration: "Сегодня",
      distanceKm: 5,
      mainPhotoUrl:
        "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=350&h=350&q=80",
      activityId: "1",
      isVerified: false,
      mainPhotoThumbnailUrl:
        "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=256&q=80",
      activityType: "Прогулка и смолток",
      activityTypeLabel: "Я хочу",
      whenAvailable: "",
      timeOfDay: "",
      cityName: "Moscow",
    },
  ];
  return {
    data: mockData,
  };
};

export default useFeed;
