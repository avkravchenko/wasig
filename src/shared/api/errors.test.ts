import { getApiErrorMessage, normalizeApiError, type ApiError } from "./errors";

describe("normalizeApiError", () => {
  it("returns already normalized api error as is", () => {
    const apiError: ApiError = {
      isApiError: true,
      status: 400,
      code: "BAD_REQUEST",
      message: "Bad request",
    };

    const result = normalizeApiError(apiError);

    expect(result).toBe(apiError);
  });

  it("normalizes axios-like error with response payload", () => {
    const error = {
      isAxiosError: true,
      message: "Request failed",
      response: {
        status: 422,
        data: {
          message: "Validation failed",
          code: "VALIDATION_ERROR",
          details: { field: "name" },
        },
      },
    };

    expect(normalizeApiError(error)).toEqual({
      isApiError: true,
      status: 422,
      code: "VALIDATION_ERROR",
      message: "Validation failed",
      details: { field: "name" },
    });
  });

  it("falls back to response.error and generated http code for axios-like error", () => {
    const error = {
      isAxiosError: true,
      message: "Request failed",
      response: {
        status: 401,
        data: {
          error: "Unauthorized",
        },
      },
    };

    expect(normalizeApiError(error)).toEqual({
      isApiError: true,
      status: 401,
      code: "HTTP_401",
      message: "Unauthorized",
      details: undefined,
    });
  });

  it("handles native Error input", () => {
    expect(normalizeApiError(new Error("Boom"))).toEqual({
      isApiError: true,
      status: null,
      code: "UNKNOWN_ERROR",
      message: "Boom",
    });
  });

  it("handles unknown values with default message", () => {
    expect(normalizeApiError(123)).toEqual({
      isApiError: true,
      status: null,
      code: "UNKNOWN_ERROR",
      message: "Something went wrong. Please try again.",
    });
  });
});

describe("getApiErrorMessage", () => {
  it("returns normalized message", () => {
    expect(getApiErrorMessage(new Error("Oops"))).toBe("Oops");
  });
});
