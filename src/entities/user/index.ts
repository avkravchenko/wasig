import { Town } from "@/entities/location";
import { Hobby, CustomHobby } from "@/entities/hobby";
import { MeetingGoal, CommunicationStyle } from "@/entities/meeting";

export interface User {
  id: string;
  newUsername: boolean;
  phoneNumber: string;
  profileCompleted: boolean;
}

export interface UserProfile {
  id: string;
  name?: string;
  birthDate?: string;
  gender?: "male" | "female";
  town?: Town;
  hobbies?: Hobby[];
  customHobbies?: CustomHobby[];
  meetingGoal?: MeetingGoal;
  communicationStyle?: CommunicationStyle;
  photos?: string[];
  profileCompleted: boolean;
}
