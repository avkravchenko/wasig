import { MeetingGoal } from "@/entities/meeting";

export interface FeedFilters {
  search: string;
  townId: number | null;
  hobbyIds: number[];
  meetingGoals: MeetingGoal[];
  onlyWithPhoto: boolean;
}
