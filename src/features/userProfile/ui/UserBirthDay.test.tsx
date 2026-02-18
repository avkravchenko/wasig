import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import UserBirthDay from "./UserBirthDay";
import useBirthDate from "../model/hooks/useBirthDate";

jest.mock("../model/hooks/useBirthDate", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/shared/ui/ControlledTextField/ControlledTextField", () => {
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  const MockControlledTextField = () => <Text>birthday-field</Text>;
  MockControlledTextField.displayName = "MockControlledTextField";

  return {
    __esModule: true,
    default: MockControlledTextField,
  };
});

const mockedUseBirthDate = useBirthDate as jest.MockedFunction<typeof useBirthDate>;

describe("UserBirthDay", () => {
  beforeEach(() => {
    mockedUseBirthDate.mockReset();
  });

  it("wires submit through handleSubmit wrapper", () => {
    const submitBirthDate = jest.fn();
    const wrappedSubmit = jest.fn();
    const handleSubmit = jest.fn(() => wrappedSubmit);

    mockedUseBirthDate.mockReturnValue({
      control: {} as any,
      isValid: true,
      isLoading: false,
      submitBirthDate,
      handleSubmit: handleSubmit as any,
    });

    const { getByText } = render(<UserBirthDay onNextStep={jest.fn()} />);
    expect(handleSubmit).toHaveBeenCalledWith(submitBirthDate);

    fireEvent.press(getByText("Далее"));
    expect(wrappedSubmit).toHaveBeenCalledTimes(1);
  });

  it("renders loading button title", () => {
    mockedUseBirthDate.mockReturnValue({
      control: {} as any,
      isValid: true,
      isLoading: true,
      submitBirthDate: jest.fn(),
      handleSubmit: jest.fn((fn) => fn) as any,
    });

    const { getByText } = render(<UserBirthDay onNextStep={jest.fn()} />);
    expect(getByText("Сохранение...")).toBeTruthy();
  });
});
