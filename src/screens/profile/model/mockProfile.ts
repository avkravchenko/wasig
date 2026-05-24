import type { MyProfile } from "./types";

export const mockProfile: MyProfile = {
  id: "demo-profile-1",
  phoneNumber: "+7 999 123-45-67",
  name: "Иван",
  age: 32,
  birthDate: "1992-08-14",
  gender: "male",
  city: {
    id: 1,
    name: "Москва",
    region: "Москва",
  },
  meetingGoal: "TALK",
  communicationStyle: "BALANCED",
  expectations:
    "Хочу находить людей для спокойных прогулок, кофе и разговоров без спешки. Мне важно, чтобы встреча была легкой и комфортной для обоих.",
  interests: [
    {
      id: 1,
      name: "Кино",
      category: "Досуг",
      isCustom: false,
    },
    {
      id: 2,
      name: "Кофе",
      category: "Еда и напитки",
      isCustom: false,
    },
    {
      id: 3,
      name: "Прогулки",
      category: "Активности",
      isCustom: false,
    },
    {
      id: 4,
      name: "Новые знакомства",
      category: "Общение",
      isCustom: false,
    },
  ],
  photos: [
    {
      id: "demo-photo-1",
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      position: 1,
      isMain: true,
    },
    {
      id: "demo-photo-2",
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      position: 2,
      isMain: false,
    },
    {
      id: "demo-photo-3",
      url: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1200&q=80",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=600&q=80",
      position: 3,
      isMain: false,
    },
  ],
  isProfileCompleted: true,
  onboardingCompleted: true,
};
