import { MeetingGoal, CommunicationStyle } from "@/entities";

export {
  Town,
  Hobby,
  CustomHobby,
  CategoriesWithHobbies,
  MeetingGoal,
  MeetingGoalItem,
  CommunicationStyle,
  CommunicationStyleItem,
} from "@/entities";

export interface UserProfileFormData {
  name?: string;
  birthDate?: string;
  gender?: "male" | "female";
  townId?: number;
  interestIds?: number[];
  customInterests?: string[];
  meetingGoal?: MeetingGoal;
  communicationStyle?: CommunicationStyle;
}
