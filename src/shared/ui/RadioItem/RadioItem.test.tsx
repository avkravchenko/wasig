import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import RadioItem from "./RadioItem";

describe("RadioItem", () => {
  it("renders label", () => {
    const { getByText } = render(
      <RadioItem label="Listener" selected={false} onPress={jest.fn()} />
    );

    expect(getByText("Listener")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <RadioItem label="Talker" selected={true} onPress={onPress} />
    );

    fireEvent.press(getByText("Talker"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
