import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react-native";
import ErrorComponent from "./ErrorComponent";

describe("ErrorComponent", () => {
  it("renders default title and description", () => {
    const { getByText } = render(<ErrorComponent />);

    expect(getByText("Ops")).toBeTruthy();
    expect(getByText("Something went wrong")).toBeTruthy();
  });

  it("renders custom title and description", () => {
    const { getByText } = render(
      <ErrorComponent title="Ошибка" description="Попробуйте снова" />
    );

    expect(getByText("Ошибка")).toBeTruthy();
    expect(getByText("Попробуйте снова")).toBeTruthy();
  });
});
