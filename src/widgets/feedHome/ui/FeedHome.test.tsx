import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import FeedHome from "./FeedHome";
import useFeedHomeData from "@/features/feed/model/hooks/useFeedHomeData";
import {
  FeedAvailability,
  FeedDuration,
  FeedItem,
  FeedTimeOfDay,
} from "@/entities/feed";
import FeedList from "@/widgets/feedList";
import FeedProfileHeader from "@/widgets/feedProfileHeader";

jest.mock("@/features/feed/ui/CreateActivityForm", () => {
  const { Text } = require("react-native");

  return {
    __esModule: true,
    default: ({ isVisible }: { isVisible: boolean }) =>
      isVisible ? <Text>FORM_VISIBLE</Text> : null,
  };
});

jest.mock("@/features/feed/model/hooks/useFeedHomeData", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock("@/widgets/feedList", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock("@/widgets/feedProfileHeader", () => ({
  __esModule: true,
  default: jest.fn(
    ({ onCreateActivityPress }: { onCreateActivityPress: () => void }) => {
      const { Pressable, Text } = require("react-native");

      return (
        <Pressable onPress={onCreateActivityPress}>
          <Text>HEADER_CREATE_ACTIVITY</Text>
        </Pressable>
      );
    },
  ),
}));

const mockedUseFeedHomeData = useFeedHomeData as jest.MockedFunction<
  typeof useFeedHomeData
>;
const mockedFeedList = FeedList as unknown as jest.Mock;
const mockedFeedProfileHeader = FeedProfileHeader as unknown as jest.Mock;

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
  interests: [],
  whenAvailable: FeedAvailability.TODAY,
  timeOfDay: FeedTimeOfDay.EVENING,
  duration: FeedDuration.TWO_HOURS,
  distanceKm: 4,
  cityName: "Москва",
};

describe("FeedHome", () => {
  beforeEach(() => {
    mockedUseFeedHomeData.mockReset();
    mockedFeedList.mockClear();
    mockedFeedProfileHeader.mockClear();
    mockedUseFeedHomeData.mockReturnValue({
      data: [feedItem],
      emptyTitle: "Карточки пока не найдены",
      errorDescription: "Ошибка",
      errorTitle: "Не удалось загрузить ленту",
      feedMode: "feed",
      isError: false,
      isLoading: false,
      refetch: jest.fn(async () => ({ data: [feedItem] })) as any,
      refreshingText: "Обновляем ленту",
    });
  });

  it("renders profile header", () => {
    render(<FeedHome />);

    expect(mockedFeedProfileHeader).toHaveBeenCalled();
  });

  it("passes feed data to FeedList", () => {
    render(<FeedHome />);

    expect(mockedFeedList.mock.calls.at(-1)?.[0]).toEqual(
      expect.objectContaining({
        contentBottomPadding: 96,
        data: [feedItem],
        emptyTitle: "Карточки пока не найдены",
        refreshingText: "Обновляем ленту",
      }),
    );
  });

  it("opens create activity form from the header action", () => {
    mockedUseFeedHomeData.mockReturnValue({
      data: [],
      emptyTitle: "У вас пока нет активностей",
      errorDescription: "Ошибка",
      errorTitle: "Не удалось загрузить мои активности",
      feedMode: "myActivities",
      isError: false,
      isLoading: false,
      refetch: jest.fn(async () => ({ data: [] })) as any,
      refreshingText: "Обновляем активности",
    });

    const { getByText } = render(<FeedHome />);

    fireEvent.press(getByText("HEADER_CREATE_ACTIVITY"));

    expect(mockedFeedList.mock.calls.at(-1)?.[0]).toEqual(
      expect.objectContaining({
        contentBottomPadding: 96,
      }),
    );
    expect(getByText("FORM_VISIBLE")).toBeTruthy();
  });
});
