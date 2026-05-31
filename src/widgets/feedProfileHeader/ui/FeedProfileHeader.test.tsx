import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import { Image } from "react-native";
import FeedProfileHeader from "./FeedProfileHeader";
import useMyActivities from "@/features/feed/model/hooks/useMyActivities";
import { useFeedModeStore } from "@/features/feed/model/store";
import useMyProfile from "@/screens/profile/model/hooks/useMyProfile";
import {
  FeedAvailability,
  FeedDuration,
  FeedItem,
  FeedTimeOfDay,
} from "@/entities/feed";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock("@/features/feed/model/hooks/useMyActivities", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/screens/profile/model/hooks/useMyProfile", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../../assets/icons/notifications-alt-fill.svg", () => {
  const { Text } = require("react-native");

  return {
    __esModule: true,
    default: () => <Text>NotificationsIcon</Text>,
  };
});

const mockedUseMyActivities = useMyActivities as jest.MockedFunction<
  typeof useMyActivities
>;
const mockedUseMyProfile = useMyProfile as jest.MockedFunction<
  typeof useMyProfile
>;

const activity: FeedItem = {
  activityId: "activity-my-1",
  userId: "user-1",
  userName: "Иван",
  userAge: 25,
  userGender: "male",
  isVerified: true,
  mainPhotoUrl: "https://example.com/main.jpg",
  mainPhotoThumbnailUrl: "https://example.com/thumb.jpg",
  activityTitle: "Мой кофе",
  activityDescription: "Встретиться утром",
  activityType: "COFFEE",
  activityTypeLabel: "Кофе",
  interests: [],
  whenAvailable: FeedAvailability.TODAY,
  timeOfDay: FeedTimeOfDay.EVENING,
  duration: FeedDuration.TWO_HOURS,
  distanceKm: 4,
  cityName: "Москва",
};

describe("FeedProfileHeader", () => {
  beforeEach(() => {
    mockedUseMyActivities.mockReset();
    mockedUseMyProfile.mockReset();
    mockedUseMyActivities.mockReturnValue({ data: [] } as any);
    mockedUseMyProfile.mockReturnValue({ profile: null } as any);
    useFeedModeStore.setState({ mode: "feed" });
  });

  it("shows create activity text in two lines when there are no activities", () => {
    const { getByText } = render(<FeedProfileHeader />);

    expect(getByText("Создать\nактивность")).toBeTruthy();
  });

  it("shows first user activity text", () => {
    mockedUseMyActivities.mockReturnValue({ data: [activity] } as any);

    const { getByText } = render(<FeedProfileHeader />);

    expect(getByText("Мой кофе")).toBeTruthy();
    expect(getByText("Встретиться утром")).toBeTruthy();
  });

  it("shows main profile photo in avatar", () => {
    mockedUseMyProfile.mockReturnValue({
      profile: {
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
    } as any);

    const { UNSAFE_getByType } = render(<FeedProfileHeader />);

    expect(UNSAFE_getByType(Image).props.source).toEqual({
      uri: "https://example.com/thumb.jpg",
    });
  });

  it("toggles feed mode from text container press", () => {
    const { getAllByRole } = render(<FeedProfileHeader />);

    fireEvent.press(getAllByRole("button")[1]);

    expect(useFeedModeStore.getState().mode).toBe("myActivities");
  });

  it("shows create action in my activities mode", () => {
    const onCreateActivityPress = jest.fn();
    useFeedModeStore.setState({ mode: "myActivities" });

    const { getByText } = render(
      <FeedProfileHeader onCreateActivityPress={onCreateActivityPress} />,
    );

    fireEvent.press(getByText("Создать"));

    expect(onCreateActivityPress).toHaveBeenCalled();
  });
});
