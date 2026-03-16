import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react-native";
import useFeed from "@/features/feed/model/hooks/useFeed";
import FeedList from "./FeedList";
import { FeedCard, FeedItem } from "@/entities/feed";
import { useCurrentLocation } from "@/shared/lib";

jest.mock("@/features/feed/model/hooks/useFeed", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/entities/feed", () => ({
  __esModule: true,
  ...(jest.requireActual("@/entities/feed") as object),
  FeedCard: jest.fn(() => null),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock("@/shared/lib", () => ({
  __esModule: true,
  ...(jest.requireActual("@/shared/lib") as object),
  useCurrentLocation: jest.fn(),
}));

const mockedUseFeed = useFeed as jest.MockedFunction<typeof useFeed>;
const mockedCard = FeedCard as unknown as jest.Mock;
const mockedUseCurrentLocation =
  useCurrentLocation as jest.MockedFunction<typeof useCurrentLocation>;

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
    mockedUseCurrentLocation.mockReturnValue({
      latitude: 55.75,
      longitude: 37.61,
    });
  });

  it("renders feed items using Card component", () => {
    const data = [feedItem];
    mockedUseFeed.mockReturnValue({ data } as any);

    render(<FeedList />);

    expect(mockedCard).toHaveBeenCalledTimes(1);
    expect(mockedCard.mock.calls[0][0]).toEqual(
      expect.objectContaining({ cardData: feedItem })
    );
    expect(mockedUseFeed).toHaveBeenCalledWith({
      latitude: 55.75,
      longitude: 37.61,
    });
  });
});
