import { create } from "zustand";

type AuthStatus = "unknown" | "authenticated" | "unauthenticated";

interface AuthState {
  status: AuthStatus;
  setAuthenticated: () => void;
  setUnauthenticated: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: "unknown",
  setAuthenticated: () => set({ status: "authenticated" }),
  setUnauthenticated: () => set({ status: "unauthenticated" }),
}));
