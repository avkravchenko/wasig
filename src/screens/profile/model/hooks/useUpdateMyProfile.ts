import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postExpectations } from "@/features/userProfile/api/postExpectations";
import { postUserBirthdDate } from "@/features/userProfile/api/postUserBirthdDate";
import { postUserCommunicationStyle } from "@/features/userProfile/api/postUserCommunicationStyle";
import { postUserGender } from "@/features/userProfile/api/postUserGender";
import { postUserInterests } from "@/features/userProfile/api/postUserInterests";
import { postUserMeetingGoal } from "@/features/userProfile/api/postUserMeetingGoal";
import { postUserName } from "@/features/userProfile/api/postUserName";
import { postUserTown } from "@/features/userProfile/api/postUserTown";
import type { PostUserInterestsRequest } from "@/features/userProfile/api/types";
import type { CommunicationStyle, MeetingGoal } from "@/entities/meeting";
import { MY_PROFILE_QUERY_KEY } from "./useMyProfile";

export type ProfileUpdateInput =
  | { field: "name"; value: string }
  | { field: "birthDate"; value: string }
  | { field: "gender"; value: "MALE" | "FEMALE" }
  | { field: "city"; value: number }
  | { field: "meetingGoal"; value: MeetingGoal }
  | { field: "communicationStyle"; value: CommunicationStyle }
  | { field: "expectations"; value: string }
  | { field: "interests"; value: PostUserInterestsRequest };

const updateMyProfileField = async (input: ProfileUpdateInput) => {
  switch (input.field) {
    case "name":
      await postUserName(input.value);
      return;
    case "birthDate":
      await postUserBirthdDate(input.value);
      return;
    case "gender":
      await postUserGender(input.value);
      return;
    case "city":
      await postUserTown(input.value);
      return;
    case "meetingGoal":
      await postUserMeetingGoal(input.value);
      return;
    case "communicationStyle":
      await postUserCommunicationStyle(input.value);
      return;
    case "expectations":
      await postExpectations(input.value);
      return;
    case "interests":
      await postUserInterests(input.value);
      return;
    default:
      throw new Error("Unsupported profile field");
  }
};

const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ProfileUpdateInput>({
    mutationFn: updateMyProfileField,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: MY_PROFILE_QUERY_KEY }),
  });
};

export default useUpdateMyProfile;
