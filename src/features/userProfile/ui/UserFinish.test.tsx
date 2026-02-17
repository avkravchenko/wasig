import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import UserFinish from "./UserFinish";
import { useNavigation } from "@react-navigation/native";
import { ROUTER_NAME_SPACES } from "@/shared/routes/routerNameSpaces";

jest.mock("@react-navigation/native", () => ({
  __esModule: true,
  useNavigation: jest.fn(),
}));

const mockedUseNavigation = useNavigation as jest.MockedFunction<
  typeof useNavigation
>;

describe("UserFinish", () => {
  beforeEach(() => {
    mockedUseNavigation.mockReset();
  });

  it("resets navigation to home on button press", () => {
    const reset = jest.fn();
    mockedUseNavigation.mockReturnValue({ reset } as any);

    const { getByText } = render(<UserFinish />);
    fireEvent.press(getByText("На главную"));

    expect(reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: ROUTER_NAME_SPACES.HOME.NAME }],
    });
  });
});
