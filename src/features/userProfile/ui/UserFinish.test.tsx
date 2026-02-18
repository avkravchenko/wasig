import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import UserFinish from "./UserFinish";

describe("UserFinish", () => {
  it("calls onGoHome on button press", () => {
    const onGoHome = jest.fn();
    const { getByText } = render(<UserFinish onGoHome={onGoHome} />);
    fireEvent.press(getByText("На главную"));

    expect(onGoHome).toHaveBeenCalledTimes(1);
  });
});
