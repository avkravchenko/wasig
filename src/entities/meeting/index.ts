export enum MeetingGoal {
  WALK = "WALK",
  TALK = "TALK",
  COFFEE = "COFFEE",
  SPORT = "SPORT",
  CULTURE = "CULTURE",
  OTHER = "OTHER",
}

export interface MeetingGoalItem {
  label: string;
  value: MeetingGoal;
  selected: boolean;
}

export enum CommunicationStyle {
  LISTENER = "LISTENER",
  TALKER = "TALKER",
  BALANCED = "BALANCED",
}

export interface CommunicationStyleItem {
  label: string;
  value: CommunicationStyle;
  selected: boolean;
}
