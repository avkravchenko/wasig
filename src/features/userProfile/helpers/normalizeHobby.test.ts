import { describe, expect, it } from "@jest/globals";
import normalizeHobbies from "./normalizeHobby";
import { Hobby } from "../model/types";

describe("normalizeHobbies", () => {
  it("returns empty array for empty input", () => {
    expect(normalizeHobbies([])).toEqual([]);
  });

  it("groups hobbies by category and keeps source order inside groups", () => {
    const hobbies: Hobby[] = [
      { id: 1, name: "Run", category: "Sport", isCustom: false },
      { id: 2, name: "Coffee", category: "Social", isCustom: false },
      { id: 3, name: "Swim", category: "Sport", isCustom: true },
    ];

    expect(normalizeHobbies(hobbies)).toEqual([
      {
        category: "Sport",
        interests: [
          { id: 1, name: "Run", category: "Sport", isCustom: false },
          { id: 3, name: "Swim", category: "Sport", isCustom: true },
        ],
      },
      {
        category: "Social",
        interests: [{ id: 2, name: "Coffee", category: "Social", isCustom: false }],
      },
    ]);
  });
});
