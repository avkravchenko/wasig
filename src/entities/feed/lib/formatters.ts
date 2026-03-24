import { FeedAvailability, FeedDuration, FeedTimeOfDay } from "../model/types";

const FEED_AVAILABILITY_LABELS: Record<FeedAvailability, string> = {
  [FeedAvailability.TODAY]: "Сегодня",
  [FeedAvailability.TOMORROW]: "Завтра",
  [FeedAvailability.THIS_WEEK]: "На этой неделе",
  [FeedAvailability.WEEKEND]: "В выходные",
};

const FEED_DURATION_LABELS: Record<FeedDuration, string> = {
  [FeedDuration.ONE_HOUR]: "1 час",
  [FeedDuration.TWO_HOURS]: "2 часа",
  [FeedDuration.THREE_HOURS]: "3 часа",
  [FeedDuration.ALL_DAY]: "Весь день",
  [FeedDuration.FLEXIBLE]: "Гибко",
};

const FEED_TIME_OF_DAY_LABELS: Record<string, string> = {
  [FeedTimeOfDay.MORNING]: "Утром",
  [FeedTimeOfDay.AFTERNOON]: "Днем",
  [FeedTimeOfDay.EVENING]: "Вечером",
  [FeedTimeOfDay.NIGHT]: "Ночью",
  morning: "Утром",
  afternoon: "Днем",
  evening: "Вечером",
  night: "Ночью",
};

export const getFeedAvailabilityLabel = (value: FeedAvailability): string =>
  FEED_AVAILABILITY_LABELS[value];

export const getFeedDurationLabel = (value: FeedDuration): string =>
  FEED_DURATION_LABELS[value];

export const getFeedTimeOfDayLabel = (value: string): string =>
  FEED_TIME_OF_DAY_LABELS[value] ?? value;
