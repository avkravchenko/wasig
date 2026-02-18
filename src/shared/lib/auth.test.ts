import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  clearAccessToken,
  clearRefreshToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./auth";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("auth storage helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sets access token", async () => {
    await setAccessToken("access-value");

    expect(AsyncStorage.setItem).toHaveBeenCalledWith("accessToken", "access-value");
  });

  it("gets access token", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("access-value");

    await expect(getAccessToken()).resolves.toBe("access-value");
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("accessToken");
  });

  it("clears access token", async () => {
    await clearAccessToken();

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("accessToken");
  });

  it("sets refresh token", async () => {
    await setRefreshToken("refresh-value");

    expect(AsyncStorage.setItem).toHaveBeenCalledWith("refreshToken", "refresh-value");
  });

  it("gets refresh token", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("refresh-value");

    await expect(getRefreshToken()).resolves.toBe("refresh-value");
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("refreshToken");
  });

  it("clears refresh token", async () => {
    await clearRefreshToken();

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("refreshToken");
  });
});
