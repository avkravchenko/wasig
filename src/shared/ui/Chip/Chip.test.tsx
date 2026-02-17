import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import Chip from "./Chip";

describe("Chip", () => {
  it("renders title", () => {
    const { getByText } = render(
      <Chip title="Sport" selected={false} onPress={jest.fn()} />
    );

    expect(getByText("Sport")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Chip title="Culture" selected={false} onPress={onPress} />
    );

    fireEvent.press(getByText("Culture"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
