import { isAxiosError } from "axios";

export interface ApiError {
  isApiError: true;
  status: number | null;
  code: string;
  message: string;
  details?: unknown;
}

const DEFAULT_API_ERROR_MESSAGE = "Something went wrong. Please try again.";

export const normalizeApiError = (error: unknown): ApiError => {
  if (
    typeof error === "object" &&
    error !== null &&
    "isApiError" in error &&
    (error as { isApiError?: unknown }).isApiError === true
  ) {
    return error as ApiError;
  }

  if (isAxiosError(error)) {
    const responseData = error.response?.data as
      | {
          message?: unknown;
          code?: unknown;
          error?: unknown;
          details?: unknown;
        }
      | undefined;

    const message =
      typeof responseData?.message === "string"
        ? responseData.message
        : typeof responseData?.error === "string"
          ? responseData.error
          : error.message || DEFAULT_API_ERROR_MESSAGE;

    const code =
      typeof responseData?.code === "string"
        ? responseData.code
        : `HTTP_${error.response?.status ?? "UNKNOWN"}`;

    return {
      isApiError: true,
      status: error.response?.status ?? null,
      code,
      message,
      details: responseData?.details,
    };
  }

  if (error instanceof Error) {
    return {
      isApiError: true,
      status: null,
      code: "UNKNOWN_ERROR",
      message: error.message || DEFAULT_API_ERROR_MESSAGE,
    };
  }

  return {
    isApiError: true,
    status: null,
    code: "UNKNOWN_ERROR",
    message: DEFAULT_API_ERROR_MESSAGE,
  };
};

export const getApiErrorMessage = (error: unknown): string => {
  return normalizeApiError(error).message;
};
