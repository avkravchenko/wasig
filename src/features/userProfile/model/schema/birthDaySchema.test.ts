import { describe, expect, it } from "@jest/globals";
import { birthdayStringSchema } from "./birthDaySchema";

describe("birthdayStringSchema", () => {
  it("accepts a valid date with age between 18 and 100", () => {
    expect(() => birthdayStringSchema.parse("01.01.1995")).not.toThrow();
  });

  it("rejects invalid date format", () => {
    expect(() => birthdayStringSchema.parse("1995-01-01")).toThrow();
  });

  it("rejects underage date", () => {
    expect(() => birthdayStringSchema.parse("01.01.2012")).toThrow();
  });
});
