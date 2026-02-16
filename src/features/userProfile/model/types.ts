export interface Town {
  id: number;
  name: string;
  region: string;
}

export interface Hobby {
  id: number;
  name: string;
  category: string;
  isCustom: boolean;
}

export interface CustomHobby {
    id: string;
    name: string;
}

export interface CategoriesWithHobbies {
  category: string;
  interests: Hobby[];
}

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
