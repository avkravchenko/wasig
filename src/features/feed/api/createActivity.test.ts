import { describe, expect, it, jest } from "@jest/globals";
import {
  FeedAvailability,
  FeedDuration,
  FeedTimeOfDay,
} from "@/entities/feed";
import { privateApi } from "@/shared/api/privateApi";
import { createActivity } from "./createActivity";
import { CreateActivityRequest } from "../model/types/activity";

jest.mock("@/shared/api/privateApi", () => ({
  __esModule: true,
  privateApi: {
    post: jest.fn(),
  },
}));

const mockedPrivateApiPost = privateApi.post as unknown as jest.MockedFunction<
  (url: string, payload: CreateActivityRequest) => Promise<unknown>
>;

describe("createActivity", () => {
  it("posts activity payload", async () => {
    const payload: CreateActivityRequest = {
      title: "Сходить в бар",
      description:
        "О большом, о вечном, о бесконечном. Короч говоря, мне нужна компания...",
      activityType: "BAR",
      whenAvailable: FeedAvailability.THIS_WEEK,
      timeOfDay: FeedTimeOfDay.EVENING,
      duration: FeedDuration.TWO_HOURS,
      about: "string",
      communicationNote: "Я спокоен и заинтересован",
      latitude: 0,
      longitude: 0,
    };

    mockedPrivateApiPost.mockResolvedValueOnce({});

    await createActivity(payload);

    expect(mockedPrivateApiPost).toHaveBeenCalledWith(
      "/api/v1/feed/activities",
      payload,
    );
  });
});
