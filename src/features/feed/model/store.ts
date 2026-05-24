import { create } from "zustand";

export type FeedMode = "feed" | "myActivities";

interface FeedModeState {
  mode: FeedMode;
  setMode: (mode: FeedMode) => void;
  toggleMode: () => void;
}

export const useFeedModeStore = create<FeedModeState>((set) => ({
  mode: "feed",
  setMode: (mode) => set({ mode }),
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === "myActivities" ? "feed" : "myActivities",
    })),
}));
