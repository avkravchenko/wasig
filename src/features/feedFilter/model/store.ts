import { create } from "zustand";
import { FeedFilters } from "./types";
import defaultFilterStateFactory from "../lib/factories/defaultFilterStateFactory";
import { areFiltersEqual, cloneFilters } from "../lib/filterUtils";

interface FeedFilterState {
  defaults: FeedFilters;
  applied: FeedFilters;
  setDefaults: (nextDefaults: FeedFilters) => void;
  applyFilters: (filters: FeedFilters) => void;
}

export const useFeedFilterStore = create<FeedFilterState>((set) => ({
  defaults: cloneFilters(defaultFilterStateFactory()),
  applied: cloneFilters(defaultFilterStateFactory()),
  setDefaults: (nextDefaults) =>
    set((state) => {
      const normalizedDefaults = cloneFilters(nextDefaults);

      if (areFiltersEqual(normalizedDefaults, state.defaults)) {
        return state;
      }

      return {
        defaults: normalizedDefaults,
        applied: areFiltersEqual(state.applied, state.defaults)
          ? normalizedDefaults
          : state.applied,
      };
    }),
  applyFilters: (filters) =>
    set({
      applied: cloneFilters(filters),
    }),
}));
