import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import UserSex from "./UserSex";
import useGender from "../model/hooks/useGender";

jest.mock("../model/hooks/useGender", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseGender = useGender as jest.MockedFunction<typeof useGender>;

describe("UserSex", () => {
  beforeEach(() => {
    mockedUseGender.mockReset();
  });

  it("calls handleGenderSelect when a gender is pressed", () => {
    const handleGenderSelect = jest.fn();

    mockedUseGender.mockReturnValue({
      genders: [
        { sex: "male", label: "Мужчина", selected: false },
        { sex: "female", label: "Женщина", selected: false },
      ],
      handleGenderSelect,
      submitGender: jest.fn(),
    });

    const { getByText } = render(<UserSex onNextStep={jest.fn()} />);
    fireEvent.press(getByText("Мужчина"));

    expect(handleGenderSelect).toHaveBeenCalledWith("male");
  });

  it("submits when selection exists", () => {
    const submitGender = jest.fn();
    mockedUseGender.mockReturnValue({
      genders: [
        { sex: "male", label: "Мужчина", selected: true },
        { sex: "female", label: "Женщина", selected: false },
      ],
      handleGenderSelect: jest.fn(),
      submitGender,
    });

    const { getByText } = render(<UserSex onNextStep={jest.fn()} />);
    fireEvent.press(getByText("Далее"));

    expect(submitGender).toHaveBeenCalledTimes(1);
  });

  it("does not submit when no selection exists", () => {
    const submitGender = jest.fn();
    mockedUseGender.mockReturnValue({
      genders: [
        { sex: "male", label: "Мужчина", selected: false },
        { sex: "female", label: "Женщина", selected: false },
      ],
      handleGenderSelect: jest.fn(),
      submitGender,
    });

    const { getByText } = render(<UserSex onNextStep={jest.fn()} />);
    fireEvent.press(getByText("Далее"));

    expect(submitGender).not.toHaveBeenCalled();
  });
});
