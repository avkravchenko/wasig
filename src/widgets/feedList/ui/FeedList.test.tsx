import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { ComponentProps } from "react";
import { render } from "@testing-library/react-native";
import FeedList from "./FeedList";
import {
  FeedAvailability,
  FeedCard,
  FeedDuration,
  FeedItem,
  FeedTimeOfDay,
} from "@/entities/feed";

jest.mock("@/entities/feed", () => ({
  __esModule: true,
  ...(jest.requireActual("@/entities/feed") as object),
  FeedCard: jest.fn(() => null),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const mockedCard = FeedCard as unknown as jest.Mock;

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
  whenAvailable: FeedAvailability.TODAY,
  timeOfDay: FeedTimeOfDay.EVENING,
  duration: FeedDuration.TWO_HOURS,
  distanceKm: 4,
  cityName: "Москва",
};

const renderFeedList = (props?: Partial<ComponentProps<typeof FeedList>>) =>
  render(
    <FeedList
      contentBottomPadding={96}
      contentTopPadding={80}
      data={[feedItem]}
      emptyTitle="Карточки пока не найдены"
      errorTitle="Не удалось загрузить ленту"
      isError={false}
      isLoading={false}
      refreshingText="Обновляем ленту"
      {...props}
    />,
  );

describe("FeedList", () => {
  beforeEach(() => {
    mockedCard.mockClear();
  });

  it("renders feed items using Card component", () => {
    renderFeedList();

    expect(mockedCard).toHaveBeenCalled();
    expect(mockedCard.mock.calls.at(-1)?.[0]).toEqual(
      expect.objectContaining({ cardData: feedItem })
    );
  });

  it("renders empty state from props", () => {
    const { getByText } = renderFeedList({
      data: [],
      emptyTitle: "У вас пока нет активностей",
    });

    expect(getByText("У вас пока нет активностей")).toBeTruthy();
  });
});
