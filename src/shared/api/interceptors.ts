import type { AxiosInstance } from "axios";
import { getAccessToken } from "../lib/auth";

export const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};
