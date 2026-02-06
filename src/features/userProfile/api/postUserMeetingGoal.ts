import { privateApi } from "@/shared/api/privateApi";
import { MeetingGoal } from "../model/types";

export const postUserMeetingGoal = async (meetingGoal: MeetingGoal) => {
    return await privateApi.post("/api/v1/onboarding/meeting-goal", { meetingGoal });
}