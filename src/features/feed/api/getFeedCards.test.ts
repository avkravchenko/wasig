import { describe, expect, it, jest } from "@jest/globals";
import {
  FeedAvailability,
  FeedDuration,
  FeedItem,
  FeedTimeOfDay,
} from "@/entities/feed";
import {
  createFeedCardsRequest,
  extractFeedCards,
  getMyActivities,
} from "./getFeedCards";
import defaultFilterStateFactory from "@/features/feedFilter/lib/factories/defaultFilterStateFactory";
import { privateApi } from "@/shared/api/privateApi";

jest.mock("@/shared/api/privateApi", () => ({
  __esModule: true,
  privateApi: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const mockedPrivateApiGet = privateApi.get as unknown as jest.MockedFunction<
  (url: string, config?: unknown) => Promise<{ data: FeedItem[] }>
>;

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
  whenAvailable: FeedAvailability.THIS_WEEK,
  timeOfDay: FeedTimeOfDay.AFTERNOON,
  duration: FeedDuration.TWO_HOURS,
  distanceKm: null,
  cityName: "Москва",
};

const withMockPhoto = {
  ...card,
  mainPhotoUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
  mainPhotoThumbnailUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
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

    expect(extractFeedCards(payload)).toEqual([withMockPhoto]);
  });

  it("extracts cards from nested data wrapper", () => {
    const payload = {
      data: {
        cards: [card],
      },
    };

    expect(extractFeedCards(payload as any)).toEqual([withMockPhoto]);
  });

  it("ignores arrays with invalid card items", () => {
    const payload = {
      cards: [{ id: "not-a-feed-card" }],
    };

    expect(extractFeedCards(payload as any)).toEqual([]);
  });

  it("keeps existing photos when they are present", () => {
    const payload = {
      cards: [
        {
          ...card,
          mainPhotoUrl: "https://example.com/photo.jpg",
          mainPhotoThumbnailUrl: "https://example.com/thumb.jpg",
        },
      ],
    };

    expect(extractFeedCards(payload as any)).toEqual(payload.cards);
  });

  it("uses photos array when main photo fields are missing", () => {
    const payload = {
      cards: [
        {
          ...card,
          photos: [
            {
              id: "photo-1",
              url: "https://example.com/photo.jpg",
              thumbnailUrl: "https://example.com/thumb.jpg",
              position: 1,
              isMain: true,
            },
          ],
        },
      ],
    };

    expect(extractFeedCards(payload as any)).toEqual([
      {
        ...payload.cards[0],
        mainPhotoUrl: "https://example.com/photo.jpg",
        mainPhotoThumbnailUrl: "https://example.com/thumb.jpg",
      },
    ]);
  });
});

describe("createFeedCardsRequest", () => {
  it("omits coordinates when location is unavailable", () => {
    const defaults = defaultFilterStateFactory();
    const request = createFeedCardsRequest({
      filters: defaults,
      defaults,
      page: 0,
      size: 20,
    });

    expect(request).toEqual({
      page: 0,
      size: 20,
    });
  });

  it("includes coordinates only when both are valid", () => {
    const defaults = defaultFilterStateFactory();
    const request = createFeedCardsRequest({
      filters: defaults,
      defaults,
      page: 1,
      size: 10,
      latitude: 59.93,
      longitude: 30.31,
    });

    expect(request).toEqual({
      latitude: 59.93,
      longitude: 30.31,
      page: 1,
      size: 10,
    });
  });
});

describe("getMyActivities", () => {
  it("loads current user activities", async () => {
    const signal = new AbortController().signal;

    mockedPrivateApiGet.mockResolvedValueOnce({ data: [card] });

    await expect(getMyActivities({ signal })).resolves.toEqual([card]);
    expect(mockedPrivateApiGet).toHaveBeenCalledWith(
      "/api/v1/feed/my-activities",
      { signal },
    );
  });
});
