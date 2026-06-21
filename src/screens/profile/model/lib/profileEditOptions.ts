import { CommunicationStyle, MeetingGoal } from "@/entities/meeting";
import {
  COMMUNICATION_STYLE_LABELS,
  GENDER_LABELS,
  MEETING_GOAL_LABELS,
} from "./profileLabels";
import type { ProfileEditableField } from "../types";

export type ProfileEditOption<T extends string = string> = {
  label: string;
  value: T;
};

export const PROFILE_EDIT_TITLES: Record<ProfileEditableField, string> = {
  name: "Имя",
  birthDate: "Дата рождения",
  gender: "Пол",
  city: "Город",
  meetingGoal: "Цель встречи",
  communicationStyle: "Стиль общения",
  expectations: "Ожидания",
  interests: "Интересы",
};

export const PROFILE_MEETING_GOAL_OPTIONS: ProfileEditOption<MeetingGoal>[] = [
  { label: MEETING_GOAL_LABELS[MeetingGoal.WALK], value: MeetingGoal.WALK },
  { label: MEETING_GOAL_LABELS[MeetingGoal.TALK], value: MeetingGoal.TALK },
  { label: MEETING_GOAL_LABELS[MeetingGoal.COFFEE], value: MeetingGoal.COFFEE },
  { label: MEETING_GOAL_LABELS[MeetingGoal.SPORT], value: MeetingGoal.SPORT },
  {
    label: MEETING_GOAL_LABELS[MeetingGoal.CULTURE],
    value: MeetingGoal.CULTURE,
  },
  { label: MEETING_GOAL_LABELS[MeetingGoal.OTHER], value: MeetingGoal.OTHER },
];

export const PROFILE_COMMUNICATION_STYLE_OPTIONS: ProfileEditOption<CommunicationStyle>[] =
  [
    {
      label: COMMUNICATION_STYLE_LABELS[CommunicationStyle.LISTENER],
      value: CommunicationStyle.LISTENER,
    },
    {
      label: COMMUNICATION_STYLE_LABELS[CommunicationStyle.TALKER],
      value: CommunicationStyle.TALKER,
    },
    {
      label: COMMUNICATION_STYLE_LABELS[CommunicationStyle.BALANCED],
      value: CommunicationStyle.BALANCED,
    },
  ];

export const PROFILE_GENDER_OPTIONS: ProfileEditOption<"MALE" | "FEMALE">[] = [
  { label: GENDER_LABELS.MALE, value: "MALE" },
  { label: GENDER_LABELS.FEMALE, value: "FEMALE" },
];
