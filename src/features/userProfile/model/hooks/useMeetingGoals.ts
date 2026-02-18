import { MeetingGoalItem, MeetingGoal } from "../types";
import { useState } from "react";
import { postUserMeetingGoal } from "../../api/postUserMeetingGoal";

const useMeetingGoals = ({ onNextStep }: { onNextStep: () => void }) => {
  const [meetingGoal, setMeetingGoal] = useState<MeetingGoal | null>(null);

  const [meetingGoalsList, setMeetingGoalsList] = useState<MeetingGoalItem[]>([
    {
      label: "Пойти гулять",
      value: MeetingGoal.WALK,
      selected: false,
    },
    {
      label: "Общение",
      value: MeetingGoal.TALK,
      selected: false,
    },
    {
      label: "Заниматься спортом",
      value: MeetingGoal.SPORT,
      selected: false,
    },
    {
      label: "Выставка, концерт, театр и т.д.",
      value: MeetingGoal.CULTURE,
      selected: false,
    },
    {
      label: "Сходить кафе",
      value: MeetingGoal.COFFEE,
      selected: false,
    },
    {
      label: "Другое",
      value: MeetingGoal.OTHER,
      selected: false,
    },
  ]);

  const handleMeetingGoalChange = (goal: MeetingGoalItem) => {
    setMeetingGoal(goal.value);
    setMeetingGoalsList((prev) =>
      prev.map((item) =>
        item.value === goal.value
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    );
  };

  const submitUserMeetingGoal = async () => {
    try {
      if (!meetingGoal) return;

      await postUserMeetingGoal(meetingGoal);
      onNextStep();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    meetingGoal,
    meetingGoalsList,
    handleMeetingGoalChange,
    submitUserMeetingGoal,
  };
};

export default useMeetingGoals;
