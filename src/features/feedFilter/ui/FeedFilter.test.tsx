import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import FeedFilter from "./FeedFilter";
import defaultFilterStateFactory from "../lib/factories/defaultFilterStateFactory";
import { FeedFilterOptions, FeedFilters } from "../model/types";

const mockParentNavigate = jest.fn();
const mockApplyFilters = jest.fn();
const mockSetDefaults = jest.fn();

const filterOptions: FeedFilterOptions = {
  genderOptions: [
    { value: "male", label: "Мужчины" },
    { value: "female", label: "Женщины" },
  ],
  activityTypeOptions: [],
  whenAvailableOptions: [],
  timeOfDayOptions: [],
  durationOptions: [],
  communicationStyleOptions: [],
  minAge: 18,
  maxAge: 60,
  maxDistance: 100,
};

let mockDefaults: FeedFilters = defaultFilterStateFactory({
  minAge: filterOptions.minAge,
  maxAge: filterOptions.maxAge,
  maxDistance: filterOptions.maxDistance,
});

let mockApplied: FeedFilters = defaultFilterStateFactory({
  minAge: filterOptions.minAge,
  maxAge: filterOptions.maxAge,
  maxDistance: filterOptions.maxDistance,
});

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    getParent: () => ({
      navigate: mockParentNavigate,
    }),
  }),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock("../model/hooks/useFeedFilterOptions", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    options: filterOptions,
    isLoading: false,
    isError: false,
    error: null,
  })),
}));

jest.mock("../model/store", () => ({
  useFeedFilterStore: (selector: (state: unknown) => unknown) =>
    selector({
      defaults: mockDefaults,
      setDefaults: mockSetDefaults,
      applied: mockApplied,
      applyFilters: mockApplyFilters,
    }),
}));

jest.mock("./ActiveFiltersSection", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock("./FeedFilterSection", () => {
  const React = require("react");
  const { Text, TouchableOpacity } = require("react-native");

  return {
    __esModule: true,
    SECTION_KEYS: ["gender"],
    default: ({
      onPatchFilters,
    }: {
      onPatchFilters: (patch: Partial<FeedFilters>) => void;
    }) => (
      <TouchableOpacity onPress={() => onPatchFilters({ gender: "male" })}>
        <Text>Изменить фильтр</Text>
      </TouchableOpacity>
    ),
  };
});

describe("FeedFilter", () => {
  beforeEach(() => {
    mockParentNavigate.mockReset();
    mockApplyFilters.mockReset();
    mockSetDefaults.mockReset();

    mockDefaults = defaultFilterStateFactory({
      minAge: filterOptions.minAge,
      maxAge: filterOptions.maxAge,
      maxDistance: filterOptions.maxDistance,
    });

    mockApplied = defaultFilterStateFactory({
      minAge: filterOptions.minAge,
      maxAge: filterOptions.maxAge,
      maxDistance: filterOptions.maxDistance,
    });
  });

  it("applies changed filters and navigates to the home tab", () => {
    const { getByText } = render(<FeedFilter />);

    fireEvent.press(getByText("Изменить фильтр"));
    fireEvent.press(getByText("Применить"));

    expect(mockApplyFilters).toHaveBeenCalledWith(
      expect.objectContaining({ gender: "male" }),
    );
    expect(mockParentNavigate).toHaveBeenCalledWith("home-tab");
  });
});
