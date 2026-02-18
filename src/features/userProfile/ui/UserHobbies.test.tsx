import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import UserHobbies from "./UserHobbies";
import useModal from "@/shared/lib/useModal";
import useHobbies from "../model/hooks/useHobbies";

jest.mock("@/shared/lib/useModal", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../model/hooks/useHobbies", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-native-modal", () => {
  const { View } =
    jest.requireActual<typeof import("react-native")>("react-native");
  const MockModal = ({ isVisible, children }: any) =>
    isVisible ? <View>{children}</View> : null;
  MockModal.displayName = "MockModal";

  return MockModal;
});

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

const mockedUseModal = useModal as jest.MockedFunction<typeof useModal>;
const mockedUseHobbies = useHobbies as jest.MockedFunction<typeof useHobbies>;

describe("UserHobbies", () => {
  beforeEach(() => {
    mockedUseModal.mockReset();
    mockedUseHobbies.mockReset();
  });

  const setup = (overrides?: Record<string, unknown>) => {
    const setVisible = jest.fn();
    mockedUseModal.mockReturnValue({ visible: true, setVisible });

    const base = {
      hobbies: [
        {
          category: "Спорт",
          interests: [{ id: 1, name: "Бег", category: "Спорт", isCustom: false }],
        },
      ],
      search: "",
      selectedHobbies: new Set<number>([1]),
      selectedCustomHobbies: new Set<string>(),
      customHobbyInput: "Шахматы",
      customHobbyToDisplay: [{ id: "c1", name: "Шахматы" }],
      isCustomHobbyUnique: true,
      addCustomHobby: jest.fn(),
      selectCustomHobby: jest.fn(),
      setSearch: jest.fn(),
      setSelectedHobbies: jest.fn(),
      setCustomHobbyInput: jest.fn(),
      submitInterests: jest.fn(),
      resetModal: jest.fn(),
    };

    mockedUseHobbies.mockReturnValue({ ...base, ...(overrides || {}) } as any);
    return { setVisible };
  };

  it("opens custom hobby modal by pressing add chip", () => {
    const { setVisible } = setup();
    const { getAllByText } = render(<UserHobbies onNextStep={jest.fn()} />);

    fireEvent.press(getAllByText("Добавить свой интерес")[0]);
    expect(setVisible).toHaveBeenCalledWith(true);
  });

  it("calls submitInterests on next press", () => {
    const submitInterests = jest.fn();
    setup({ submitInterests });
    const { getByText } = render(<UserHobbies onNextStep={jest.fn()} />);

    fireEvent.press(getByText("Далее"));
    expect(submitInterests).toHaveBeenCalledTimes(1);
  });

  it("shows duplicate custom hobby error", () => {
    setup({ isCustomHobbyUnique: false });
    const { getByText } = render(<UserHobbies onNextStep={jest.fn()} />);

    expect(getByText("Интерес уже добавлен")).toBeTruthy();
  });
});
