import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";
import { Image } from "react-native";
import CardCover from "./CardCover";

describe("CardCover", () => {
  it("renders image with provided url", () => {
    const { UNSAFE_getByType } = render(
      <CardCover imageUrl="https://example.com/main.jpg" />
    );
    const image = UNSAFE_getByType(Image);

    expect(image.props.source).toEqual({ uri: "https://example.com/main.jpg" });
    expect(image.props.resizeMode).toBe("cover");
  });
});
