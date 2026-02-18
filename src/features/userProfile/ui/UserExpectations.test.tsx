import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import UserExpectations from "./UserExpectations";
import useExpectations from "../model/hooks/useExpectations";

jest.mock("../model/hooks/useExpectations", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/shared/ui", () => {
  const actual = jest.requireActual<typeof import("@/shared/ui")>("@/shared/ui");
  const React = jest.requireActual<typeof import("react")>("react");
  const { TextInput } =
    jest.requireActual<typeof import("react-native")>("react-native");

  const MockTextField = React.forwardRef(
    ({ value, onChange, placeholder }: any, ref: any) => (
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
      />
    )
  );
  MockTextField.displayName = "MockTextField";

  return {
    ...actual,
    TextField: MockTextField,
  };
});

const mockedUseExpectations = useExpectations as jest.MockedFunction<
  typeof useExpectations
>;

describe("UserExpectations", () => {
  beforeEach(() => {
    mockedUseExpectations.mockReset();
  });

  it("calls handleExpectationsChange on input change", () => {
    const handleExpectationsChange = jest.fn();
    const submitExpectations = jest
      .fn<() => Promise<void>>()
      .mockResolvedValue(undefined);

    mockedUseExpectations.mockReturnValue({
      expectations: "",
      inputRef: { current: null } as any,
      handleExpectationsChange,
      submitExpectations,
    });

    const { getByPlaceholderText } = render(
      <UserExpectations onNextStep={jest.fn()} />
    );
    fireEvent.changeText(getByPlaceholderText("Твои ожидания"), "Пообщаться");

    expect(handleExpectationsChange).toHaveBeenCalledWith("Пообщаться");
  });

  it("submits when next button is pressed and value exists", () => {
    const submitExpectations = jest
      .fn<() => Promise<void>>()
      .mockResolvedValue(undefined);

    mockedUseExpectations.mockReturnValue({
      expectations: "Пообщаться",
      inputRef: { current: null } as any,
      handleExpectationsChange: jest.fn(),
      submitExpectations,
    });

    const { getByText } = render(<UserExpectations onNextStep={jest.fn()} />);
    fireEvent.press(getByText("Далее"));

    expect(submitExpectations).toHaveBeenCalledTimes(1);
  });
});
