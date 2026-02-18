import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";
import { Image } from "react-native";
import CardHeader from "./CardHeader";

describe("CardHeader", () => {
  it("renders activity labels, counters and avatar", () => {
    const { getByText, UNSAFE_getByType } = render(
      <CardHeader
        mainPhotoThumbnailUrl="https://example.com/thumb.jpg"
        activityType="Прогулка"
        activityTypeLabel="Активность"
      />
    );
    const image = UNSAFE_getByType(Image);

    expect(getByText("Активность")).toBeTruthy();
    expect(getByText("Прогулка")).toBeTruthy();
    expect(getByText("9")).toBeTruthy();
    expect(getByText("99+")).toBeTruthy();
    expect(image.props.source).toEqual({ uri: "https://example.com/thumb.jpg" });
  });
});
