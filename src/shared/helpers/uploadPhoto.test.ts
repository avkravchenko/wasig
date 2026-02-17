import { describe, expect, it, jest } from "@jest/globals";
import { uploadPhotos } from "./uploadPhoto";

describe("uploadPhotos", () => {
  it("builds FormData and forwards it to postFunction", async () => {
    const response = { urls: ["https://example.com/1.jpg"] };
    const postFunction = jest.fn(async (_formData: FormData) => response);

    const result = await uploadPhotos({
      photos: ["file://one.jpg", "file://two.jpg"],
      postFunction,
    });

    expect(postFunction).toHaveBeenCalledTimes(1);
    expect(postFunction.mock.calls[0][0]).toBeInstanceOf(FormData);
    expect(result).toEqual(response);
  });
});
