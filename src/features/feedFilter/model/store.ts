import { create } from "zustand";
import { FeedFilters } from "./types";
import defaultFilterStateFactory from "../lib/factories/defaultFilterStateFactory";

interface FeedFilterState {
  draft: FeedFilters;
  applied: FeedFilters;
  setDraft: (nextDraft: FeedFilters) => void;
  patchDraft: (patch: Partial<FeedFilters>) => void;
  hydrateDraftFromApplied: () => void;
  applyDraft: () => void;
  resetDraft: () => void;
  clearAll: () => void;
}

const cloneFilters = (filters: FeedFilters): FeedFilters => ({
  ...filters,
  hobbyIds: [...filters.hobbyIds],
  meetingGoals: [...filters.meetingGoals],
});

export const useFeedFilterStore = create<FeedFilterState>((set) => ({
  draft: cloneFilters(defaultFilterStateFactory()),
  applied: cloneFilters(defaultFilterStateFactory()),
  setDraft: (nextDraft) =>
    set({
      draft: cloneFilters(nextDraft),
    }),
  patchDraft: (patch) =>
    set((state) => ({
      draft: {
        ...state.draft,
        ...patch,
        hobbyIds: patch.hobbyIds ?? state.draft.hobbyIds,
        meetingGoals: patch.meetingGoals ?? state.draft.meetingGoals,
      },
    })),
  hydrateDraftFromApplied: () =>
    set((state) => ({
      draft: cloneFilters(state.applied),
    })),
  applyDraft: () =>
    set((state) => ({
      applied: cloneFilters(state.draft),
    })),
  resetDraft: () =>
    set({
      draft: cloneFilters(defaultFilterStateFactory()),
    }),
  clearAll: () =>
    set({
      draft: cloneFilters(defaultFilterStateFactory()),
      applied: cloneFilters(defaultFilterStateFactory()),
    }),
}));
