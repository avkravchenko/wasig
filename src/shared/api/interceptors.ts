import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { normalizeApiError } from "./errors";
import {
  clearAccessToken,
  clearRefreshToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../lib/auth";

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type RefreshResponse = {
  accessToken: string;
  refreshToken?: string;
};

const REFRESH_PATH = "/api/v1/auth/refresh";
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (publicApi: AxiosInstance): Promise<string> => {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const response = await publicApi.post<RefreshResponse>(REFRESH_PATH, {
    refreshToken,
  });
  const nextAccessToken = response.data.accessToken;

  await setAccessToken(nextAccessToken);

  if (response.data.refreshToken) {
    await setRefreshToken(response.data.refreshToken);
  }

  return nextAccessToken;
};

export const setupPublicInterceptors = (api: AxiosInstance) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(normalizeApiError(error)),
  );
};

export const setupPrivateInterceptors = (
  privateApi: AxiosInstance,
  publicApi: AxiosInstance,
) => {
  privateApi.interceptors.request.use(async (config) => {
    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  privateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as RetriableRequestConfig | undefined;
      const status = error.response?.status;

      if (!originalRequest || status !== 401 || originalRequest._retry) {
        return Promise.reject(normalizeApiError(error));
      }

      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken(publicApi).finally(() => {
            refreshPromise = null;
          });
        }

        const nextAccessToken = await refreshPromise;
        if (
          originalRequest.headers &&
          typeof originalRequest.headers.set === "function"
        ) {
          originalRequest.headers.set(
            "Authorization",
            `Bearer ${nextAccessToken}`,
          );
        } else {
          originalRequest.headers = {
            ...(originalRequest.headers ?? {}),
            Authorization: `Bearer ${nextAccessToken}`,
          } as any;
        }

        return privateApi(originalRequest);
      } catch (refreshError) {
        await clearAccessToken();
        await clearRefreshToken();
        return Promise.reject(normalizeApiError(refreshError));
      }
    },
  );
};
