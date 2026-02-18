import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import UserHomeTown from "./UserHomeTown";
import useTown from "../model/hooks/useTown";

jest.mock("../model/hooks/useTown", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/shared/ui/TextField", () => {
  const { TextInput } =
    jest.requireActual<typeof import("react-native")>("react-native");
  const MockTextField = ({ value, onChange, placeholder }: any) => (
    <TextInput value={value} onChangeText={onChange} placeholder={placeholder} />
  );
  MockTextField.displayName = "MockTextField";

  return {
    __esModule: true,
    default: MockTextField,
  };
});

const mockedUseTown = useTown as jest.MockedFunction<typeof useTown>;

describe("UserHomeTown", () => {
  beforeEach(() => {
    mockedUseTown.mockReset();
  });

  it("calls setSearchHomeTown on search input change", () => {
    const setSearchHomeTown = jest.fn();
    const submitUserHomeTown = jest
      .fn<() => Promise<void>>()
      .mockResolvedValue(undefined);

    mockedUseTown.mockReturnValue({
      searchHomeTown: "",
      towns: [{ id: 1, name: "Москва", region: "Москва" }],
      selectedTown: null,
      handleSelectTown: jest.fn(),
      setSearchHomeTown,
      submitUserHomeTown,
    });

    const { getByPlaceholderText } = render(<UserHomeTown onNextStep={jest.fn()} />);
    fireEvent.changeText(getByPlaceholderText("Город"), "Казань");

    expect(setSearchHomeTown).toHaveBeenCalledWith("Казань");
  });

  it("calls handlers for town select and submit", () => {
    const handleSelectTown = jest.fn();
    const submitUserHomeTown = jest
      .fn<() => Promise<void>>()
      .mockResolvedValue(undefined);
    const town = { id: 1, name: "Москва", region: "Москва" };

    mockedUseTown.mockReturnValue({
      searchHomeTown: "",
      towns: [town],
      selectedTown: town,
      handleSelectTown,
      setSearchHomeTown: jest.fn(),
      submitUserHomeTown,
    });

    const { getByText } = render(<UserHomeTown onNextStep={jest.fn()} />);
    fireEvent.press(getByText("Москва"));
    fireEvent.press(getByText("Далее"));

    expect(handleSelectTown).toHaveBeenCalledWith(town);
    expect(submitUserHomeTown).toHaveBeenCalledTimes(1);
  });
});
