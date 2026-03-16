import { baseAxios } from "./axios";
import { setupPrivateInterceptors } from "./interceptors";
import { publicApi } from "./publicApi";
import { useAuthStore } from "../lib/authStore";

export const privateApi = baseAxios.create();

setupPrivateInterceptors(privateApi, publicApi, {
  onAuthExpired: () => useAuthStore.getState().setUnauthenticated(),
});
