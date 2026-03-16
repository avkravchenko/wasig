import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react-native";
import Card from "./Card";
import CardBody from "./CardBody";
import CardCover from "./CardCover";
import CardHeader from "./CardHeader";
import { FeedItem } from "@/entities/feed";

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
  whenAvailable: "today",
  timeOfDay: "evening",
  duration: "2 часа",
  distanceKm: 4,
  cityName: "Москва",
};

describe("Card", () => {
  beforeEach(() => {
    mockedCardHeader.mockClear();
    mockedCardCover.mockClear();
    mockedCardBody.mockClear();
  });

  it("passes relevant data to child sections", () => {
    render(<Card cardData={cardData} />);

    expect(mockedCardHeader.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        mainPhotoThumbnailUrl: cardData.mainPhotoThumbnailUrl,
        activityType: cardData.activityType,
        activityTypeLabel: cardData.activityTypeLabel,
      })
    );
    expect(mockedCardCover.mock.calls[0][0]).toEqual(
      expect.objectContaining({ imageUrl: cardData.mainPhotoUrl })
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
      })
    );
  });
});
