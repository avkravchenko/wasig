import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import UserMeetingGoal from "./UserMeetingGoal";
import useMeetingGoals from "../model/hooks/useMeetingGoals";

jest.mock("../model/hooks/useMeetingGoals", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseMeetingGoals = useMeetingGoals as jest.MockedFunction<
  typeof useMeetingGoals
>;

describe("UserMeetingGoal", () => {
  beforeEach(() => {
    mockedUseMeetingGoals.mockReset();
  });

  it("calls handleMeetingGoalChange on option press", () => {
    const handleMeetingGoalChange = jest.fn();
    const submitUserMeetingGoal = jest
      .fn<() => Promise<void>>()
      .mockResolvedValue(undefined);
    mockedUseMeetingGoals.mockReturnValue({
      meetingGoal: null,
      meetingGoalsList: [
        { label: "Общение", value: "TALK" as any, selected: false },
      ],
      handleMeetingGoalChange,
      submitUserMeetingGoal,
    });

    const { getByText } = render(<UserMeetingGoal onNextStep={jest.fn()} />);
    fireEvent.press(getByText("Общение"));

    expect(handleMeetingGoalChange).toHaveBeenCalledWith({
      label: "Общение",
      value: "TALK",
      selected: false,
    });
  });

  it("submits when user presses next and value is selected", () => {
    const submitUserMeetingGoal = jest
      .fn<() => Promise<void>>()
      .mockResolvedValue(undefined);
    mockedUseMeetingGoals.mockReturnValue({
      meetingGoal: "TALK" as any,
      meetingGoalsList: [{ label: "Общение", value: "TALK" as any, selected: true }],
      handleMeetingGoalChange: jest.fn(),
      submitUserMeetingGoal,
    });

    const { getByText } = render(<UserMeetingGoal onNextStep={jest.fn()} />);
    fireEvent.press(getByText("Далее"));

    expect(submitUserMeetingGoal).toHaveBeenCalledTimes(1);
  });
});
