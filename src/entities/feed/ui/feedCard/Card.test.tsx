import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react-native";
import Card from "./Card";
import CardBody from "../feedCard/CardBody";
import CardCover from "../feedCard/CardCover";
import CardHeader from "../feedCard/CardHeader";
import {
  FeedAvailability,
  FeedDuration,
  FeedItem,
  FeedTimeOfDay,
} from "@/entities/feed";

jest.mock("./CardHeader", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock("./CardCover", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock("./CardBody", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

const mockedCardHeader = CardHeader as unknown as jest.Mock;
const mockedCardCover = CardCover as unknown as jest.Mock;
const mockedCardBody = CardBody as unknown as jest.Mock;

const cardData: FeedItem = {
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

describe("Card", () => {
  const onCardPress = jest.fn();

  beforeEach(() => {
    mockedCardHeader.mockClear();
    mockedCardCover.mockClear();
    mockedCardBody.mockClear();
    onCardPress.mockClear();
  });

  it("passes relevant data to child sections", () => {
    render(
      <Card cardData={cardData} onCardPress={onCardPress} />,
    );

    expect(mockedCardHeader.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        mainPhotoThumbnailUrl: cardData.mainPhotoThumbnailUrl,
        activityType: cardData.activityType,
        activityTypeLabel: cardData.activityTypeLabel,
      }),
    );
    expect(mockedCardCover.mock.calls[0][0]).toEqual(
      expect.objectContaining({ imageUrl: cardData.mainPhotoUrl }),
    );
    expect(mockedCardBody.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        userName: cardData.userName,
        userAge: cardData.userAge,
        userGender: cardData.userGender,
        activityTitle: cardData.activityTitle,
        activityDescription: cardData.activityDescription,
        interests: cardData.interests,
        duration: cardData.duration,
        distanceKm: cardData.distanceKm,
        onDetailsPress: expect.any(Function),
      }),
    );
  });

  it("opens details with full card payload on details press", () => {
    render(<Card cardData={cardData} onCardPress={onCardPress} />);

    const { onDetailsPress } = mockedCardBody.mock.calls[0][0] as {
      onDetailsPress: () => void;
    };
    onDetailsPress();

    expect(onCardPress).toHaveBeenCalledWith(cardData);
  });
});
