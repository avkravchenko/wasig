import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import UserName from "./UserName";
import useName from "../model/hooks/useName";

jest.mock("../model/hooks/useName", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/shared/ui/TextField", () => {
  const React = require("react");
  const { TextInput } = require("react-native");

  return {
    __esModule: true,
    default: ({ value, onChange, placeholder }: any) => (
      <TextInput value={value} onChangeText={onChange} placeholder={placeholder} />
    ),
  };
});

const mockedUseName = useName as jest.MockedFunction<typeof useName>;

describe("UserName", () => {
  beforeEach(() => {
    mockedUseName.mockReset();
  });

  it("calls setName on input change", () => {
    const setName = jest.fn();
    mockedUseName.mockReturnValue({
      name: "",
      isPending: false,
      setName,
      submitName: jest.fn(),
    });

    const { getByPlaceholderText } = render(<UserName onNextStep={jest.fn()} />);
    fireEvent.changeText(getByPlaceholderText("Твое имя"), "Иван");

    expect(setName).toHaveBeenCalledWith("Иван");
  });

  it("submits when button is pressed and form is valid", () => {
    const submitName = jest.fn();
    mockedUseName.mockReturnValue({
      name: "Иван",
      isPending: false,
      setName: jest.fn(),
      submitName,
    });

    const { getByText } = render(<UserName onNextStep={jest.fn()} />);
    fireEvent.press(getByText("Далее"));

    expect(submitName).toHaveBeenCalledTimes(1);
  });

  it("does not submit when button is disabled", () => {
    const submitName = jest.fn();
    mockedUseName.mockReturnValue({
      name: "И",
      isPending: false,
      setName: jest.fn(),
      submitName,
    });

    const { getByText } = render(<UserName onNextStep={jest.fn()} />);
    fireEvent.press(getByText("Далее"));

    expect(submitName).not.toHaveBeenCalled();
  });
});
