import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react-native";
import CardBody from "./CardBody";
import CardBodyHobbies from "./CardBodyHobbies";
import { FeedDuration } from "../../model/types";

jest.mock("./CardBodyHobbies", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

const mockedCardBodyHobbies = CardBodyHobbies as unknown as jest.Mock;

describe("CardBody", () => {
  beforeEach(() => {
    mockedCardBodyHobbies.mockClear();
  });

  it("renders main card content and passes interests to hobbies block", () => {
    const interests = [{ id: 1, name: "Кофе", category: "Еда", isCustom: false }];
    const { getByText } = render(
      <CardBody
        userName="Иван"
        userAge={25}
        userGender="male"
        activityTitle="Прогулка"
        activityDescription="Парк и кофе"
        interests={interests}
        duration={FeedDuration.TWO_HOURS}
        distanceKm={4}
        onDetailsPress={() => {}}
      />
    );

    expect(getByText("2 часа")).toBeTruthy();
    expect(getByText("4 км от вас")).toBeTruthy();
    const title = getByText("Прогулка");
    expect(title).toBeTruthy();
    expect(title.props.numberOfLines).toBe(1);
    expect(title.props.ellipsizeMode).toBe("tail");
    const description = getByText("Парк и кофе");
    expect(description).toBeTruthy();
    expect(description.props.numberOfLines).toBe(2);
    expect(description.props.ellipsizeMode).toBe("tail");
    expect(getByText("Иван,")).toBeTruthy();
    expect(getByText("25")).toBeTruthy();
    expect(getByText("Недавно")).toBeTruthy();
    expect(getByText("Подробнее")).toBeTruthy();
    expect(mockedCardBodyHobbies.mock.calls[0][0]).toEqual(
      expect.objectContaining({ interests })
    );
  });
});
