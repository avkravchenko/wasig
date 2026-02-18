import { describe, expect, it, jest } from "@jest/globals";
import generateHobby from "./customHobbyFactory";

jest.mock("react-native-uuid", () => ({
  __esModule: true,
  default: { v4: jest.fn(() => "mocked-uuid") },
}));

describe("generateHobby", () => {
  it("creates a custom hobby with generated id and provided name", () => {
    expect(generateHobby("Board games")).toEqual({
      id: "mocked-uuid",
      name: "Board games",
    });
  });
});
