import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react-native";
import useFeed from "../model/hooks/useFeed";
import FeedList from "./FeedList";
import { FeedItem } from "@/entities/feed";
import Card from "@/features/feedItem";

jest.mock("../model/hooks/useFeed", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/features/feedItem", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

const mockedUseFeed = useFeed as jest.MockedFunction<typeof useFeed>;
const mockedCard = Card as unknown as jest.Mock;

const feedItem: FeedItem = {
  activityId: "activity-1",
  userId: "user-1",
  userName: "Иван",
  userAge: 25,
  userGender: "male",
  isVerified: true,
  mainPhotoUrl: "https://example.com/main.jpg",
  mainPhotoThumbnailUrl: "https://example.com/thumb.jpg",
  activityTitle: "Прогулка",
  activityDescription: "Парк и кофе",
  activityType: "Прогулка",
  activityTypeLabel: "Активность",
  interests: [{ id: 1, name: "Кофе", category: "Еда", isCustom: false }],
  whenAvailable: "today",
  timeOfDay: "evening",
  duration: "2 часа",
  distanceKm: 4,
  cityName: "Москва",
};

describe("FeedList", () => {
  beforeEach(() => {
    mockedUseFeed.mockReset();
    mockedCard.mockClear();
  });

  it("renders feed items using Card component", () => {
    const data = [feedItem];
    mockedUseFeed.mockReturnValue({ data } as any);

    render(<FeedList />);

    expect(mockedCard).toHaveBeenCalledTimes(1);
    expect(mockedCard.mock.calls[0][0]).toEqual(
      expect.objectContaining({ cardData: feedItem })
    );
  });
});
