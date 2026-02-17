import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import UserCommunicationStyle from "./UserCommunicationStyle";
import useCommunicationStyle from "../model/hooks/useCommunicationStyle";

jest.mock("../model/hooks/useCommunicationStyle", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseCommunicationStyle =
  useCommunicationStyle as jest.MockedFunction<typeof useCommunicationStyle>;

describe("UserCommunicationStyle", () => {
  beforeEach(() => {
    mockedUseCommunicationStyle.mockReset();
  });

  it("calls handleCommunicationStyleChange on option press", () => {
    const handleCommunicationStyleChange = jest.fn();

    mockedUseCommunicationStyle.mockReturnValue({
      communicationStyle: null,
      communicationStyleList: [
        { label: "Баланс", value: "BALANCED" as any, selected: false },
      ],
      handleCommunicationStyleChange,
      submitCommunicationStyle: jest.fn(),
    });

    const { getByText } = render(<UserCommunicationStyle onNextStep={jest.fn()} />);
    fireEvent.press(getByText("Баланс"));

    expect(handleCommunicationStyleChange).toHaveBeenCalledWith({
      label: "Баланс",
      value: "BALANCED",
      selected: false,
    });
  });

  it("submits when user presses next and value is selected", () => {
    const submitCommunicationStyle = jest.fn();

    mockedUseCommunicationStyle.mockReturnValue({
      communicationStyle: "BALANCED" as any,
      communicationStyleList: [
        { label: "Баланс", value: "BALANCED" as any, selected: true },
      ],
      handleCommunicationStyleChange: jest.fn(),
      submitCommunicationStyle,
    });

    const { getByText } = render(<UserCommunicationStyle onNextStep={jest.fn()} />);
    fireEvent.press(getByText("Далее"));

    expect(submitCommunicationStyle).toHaveBeenCalledTimes(1);
  });
});
