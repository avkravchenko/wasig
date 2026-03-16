export interface FeedFilterOption {
  value: string;
  label: string;
}

export interface FeedFilterOptions {
  genderOptions: FeedFilterOption[];
  activityTypeOptions: FeedFilterOption[];
  whenAvailableOptions: FeedFilterOption[];
  timeOfDayOptions: FeedFilterOption[];
  durationOptions: FeedFilterOption[];
  communicationStyleOptions: FeedFilterOption[];
  minAge: number;
  maxAge: number;
  maxDistance: number;
}

export interface FeedFilters {
  search: string;
  townId: number | null;
  hobbyIds: number[];
  gender: string | null;
  ageRange: [number, number];
  distanceRange: [number, number];
  meetingGoals: string[];
  hasHistory: boolean;
  availability: string | null;
  availableOnWeekdays: boolean;
  timeSlots: string[];
  durations: string[];
  communicationStyle: string | null;
  onlyVerifiedProfiles: boolean;
  onlyWithPhoto: boolean;
}
