interface UploadResponse {
  urls: string[];
}

const getFileMetaFromUri = (photoUri: string, index: number) => {
  const cleanUri = photoUri.split("?")[0] ?? "";
  const extension = cleanUri.split(".").pop()?.toLowerCase();

  if (extension === "png") {
    return { type: "image/png", name: `photo_${index}.png` };
  }
  if (extension === "webp") {
    return { type: "image/webp", name: `photo_${index}.webp` };
  }
  if (extension === "heic" || extension === "heif") {
    return { type: "image/heic", name: `photo_${index}.${extension}` };
  }

  return { type: "image/jpeg", name: `photo_${index}.jpg` };
};

export const appendPhotoToFormData = (
  formData: FormData,
  photoUri: string,
  index = 0,
) => {
  const { type, name } = getFileMetaFromUri(photoUri, index);
  const file = {
    uri: photoUri,
    type,
    name,
  };

  formData.append("file", file as any);
};

export const createPhotoFormData = (photoUri: string) => {
  const formData = new FormData();

  appendPhotoToFormData(formData, photoUri);

  return formData;
};

export const uploadPhotos = async ({
  photos,
  postFunction,
}: {
  photos: string[];
  postFunction: (formData: FormData) => Promise<UploadResponse>;
}): Promise<UploadResponse> => {
  const formData = new FormData();

  photos.forEach((photoUri, index) => {
    appendPhotoToFormData(formData, photoUri, index);
  });

  return await postFunction(formData);
};
