import { normalizeApiError } from "@/shared/api/errors";

export const MEETING_GOAL_LABELS: Record<string, string> = {
  WALK: "Пойти гулять",
  TALK: "Общение",
  COFFEE: "Сходить в кафе",
  SPORT: "Заниматься спортом",
  CULTURE: "Выставка, концерт, театр и т.д.",
  OTHER: "Другое",
};

export const COMMUNICATION_STYLE_LABELS: Record<string, string> = {
  LISTENER: "Больше слушаю",
  TALKER: "Больше говорю",
  BALANCED: "Баланс",
};

export const GENDER_LABELS: Record<string, string> = {
  male: "Мужской",
  female: "Женский",
  MALE: "Мужской",
  FEMALE: "Женский",
};

export const getTextValue = (
  value?: string | null,
  fallback = "Не указано",
) => {
  const text = value?.trim();

  return text ? text : fallback;
};

const getMappedValue = (
  value: string | null | undefined,
  labels: Record<string, string>,
) => {
  const text = getTextValue(value);

  return labels[text] ?? text;
};

export const getMeetingGoalLabel = (value?: string | null) =>
  getMappedValue(value, MEETING_GOAL_LABELS);

export const getCommunicationStyleLabel = (value?: string | null) =>
  getMappedValue(value, COMMUNICATION_STYLE_LABELS);

export const getGenderLabel = (value?: string | null) =>
  getMappedValue(value, GENDER_LABELS);

export const getBirthDateLabel = (birthDate?: string | null) => {
  const value = birthDate?.trim();

  if (!value) {
    return "Не указана";
  }

  const [year, month, day] = value.split("-");

  if (year && month && day) {
    return `${day}.${month}.${year}`;
  }

  return value;
};

export const getLocationLabel = (
  city?: { name?: string; region?: string } | null,
) => {
  if (!city?.name) {
    return "Город не указан";
  }

  return city.region ? `${city.name}, ${city.region}` : city.name;
};

export const getProfileErrorText = (error: unknown) => {
  const apiError = normalizeApiError(error);

  if (
    apiError.status === 401 ||
    apiError.status === 403 ||
    apiError.message === "No refresh token"
  ) {
    return "Нет доступа к профилю. Войдите в аккаунт еще раз.";
  }

  return apiError.message;
};
