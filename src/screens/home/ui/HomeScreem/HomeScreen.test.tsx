import { describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react-native";
import HomeScreen from "./HomeScreen";
import FeedHome from "@/widgets/feedHome";

jest.mock("@/widgets/feedHome", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

const mockedFeedHome = FeedHome as unknown as jest.Mock;

describe("HomeScreen", () => {
  it("orchestrates feed home feature", () => {
    render(<HomeScreen />);

    expect(mockedFeedHome).toHaveBeenCalled();
  });
});
