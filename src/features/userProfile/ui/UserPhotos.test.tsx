import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import UserPhotos from "./UserPhotos";
import usePhotos from "../model/hooks/usePhotos";

jest.mock("../model/hooks/usePhotos", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUsePhotos = usePhotos as jest.MockedFunction<typeof usePhotos>;

describe("UserPhotos", () => {
  beforeEach(() => {
    mockedUsePhotos.mockReset();
  });

  it("calls selectPhotos when add button is pressed", () => {
    const selectPhotos = jest.fn();
    mockedUsePhotos.mockReturnValue({
      photos: [],
      loading: false,
      galleryLoading: false,
      canAddMore: true,
      remainingSlots: 10,
      submitPhotos: jest.fn(),
      selectPhotos,
      removePhoto: jest.fn(),
      uploadLoading: false,
      uploadProgress: 0,
      isUploadError: false,
      uploadError: null,
    } as any);

    const { getByText } = render(<UserPhotos onNextStep={jest.fn()} />);
    fireEvent.press(getByText("+"));

    expect(selectPhotos).toHaveBeenCalledTimes(1);
  });

  it("calls removePhoto when remove button is pressed", () => {
    const removePhoto = jest.fn();
    mockedUsePhotos.mockReturnValue({
      photos: ["file://photo-1.jpg"],
      loading: false,
      galleryLoading: false,
      canAddMore: false,
      remainingSlots: 9,
      submitPhotos: jest.fn(),
      selectPhotos: jest.fn(),
      removePhoto,
      uploadLoading: false,
      uploadProgress: 0,
      isUploadError: false,
      uploadError: null,
    } as any);

    const { getByText } = render(<UserPhotos onNextStep={jest.fn()} />);
    fireEvent.press(getByText("+"));

    expect(removePhoto).toHaveBeenCalledWith("file://photo-1.jpg");
  });

  it("calls submitPhotos on next press", () => {
    const submitPhotos = jest.fn();
    mockedUsePhotos.mockReturnValue({
      photos: ["file://photo-1.jpg"],
      loading: false,
      galleryLoading: false,
      canAddMore: true,
      remainingSlots: 9,
      submitPhotos,
      selectPhotos: jest.fn(),
      removePhoto: jest.fn(),
      uploadLoading: false,
      uploadProgress: 0,
      isUploadError: false,
      uploadError: null,
    } as any);

    const { getByText } = render(<UserPhotos onNextStep={jest.fn()} />);
    fireEvent.press(getByText("Далее"));

    expect(submitPhotos).toHaveBeenCalledTimes(1);
  });
});
