import { describe, expect, it, jest } from "@jest/globals";
import { FeedItem } from "@/entities/feed";
import { extractFeedCards } from "./getFeedCards";

jest.mock("@/shared/api/privateApi", () => ({
  __esModule: true,
  privateApi: {
    get: jest.fn(),
  },
}));

const card: FeedItem = {
  activityId: "aaaa1111-1111-1111-1111-111111111111",
  userId: "11111111-1111-1111-1111-111111111111",
  userName: "Анна",
  userAge: 27,
  userGender: "FEMALE",
  isVerified: true,
  mainPhotoUrl: null,
  mainPhotoThumbnailUrl: null,
  activityTitle: "Кофе и музыка",
  activityDescription: "desc",
  activityType: "COFFEE",
  activityTypeLabel: "Попить кофе",
  interests: [],
  whenAvailable: "THIS_WEEK",
  timeOfDay: "AFTERNOON",
  duration: "TWO_HOURS",
  distanceKm: null,
  cityName: "Москва",
};

describe("extractFeedCards", () => {
  it("extracts cards from cards field", () => {
    const payload = {
      cards: [card],
      page: 0,
      size: 20,
      totalElements: 1,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false,
    };

    expect(extractFeedCards(payload)).toEqual([card]);
  });

  it("extracts cards from nested data wrapper", () => {
    const payload = {
      data: {
        cards: [card],
      },
    };

    expect(extractFeedCards(payload as any)).toEqual([card]);
  });

  it("ignores arrays with invalid card items", () => {
    const payload = {
      cards: [{ id: "not-a-feed-card" }],
    };

    expect(extractFeedCards(payload as any)).toEqual([]);
  });
});
