import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import Button from "./Button";

describe("Button", () => {
  it("renders title", () => {
    const { getByText } = render(<Button onPress={jest.fn()} title="Submit" />);

    expect(getByText("Submit")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress} title="Tap me" />);

    fireEvent.press(getByText("Tap me"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button onPress={onPress} title="Disabled" disabled />
    );

    fireEvent.press(getByText("Disabled"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
