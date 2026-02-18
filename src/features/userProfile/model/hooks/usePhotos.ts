import { useEffect, useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import useImagePicker from "@/shared/lib/useImagePicker";
import { postPhotos } from "../../api/postPhotos";
import { uploadPhotos } from "@/shared/helpers";

const MAX_PHOTOS = 10;

interface UploadResponse {
  urls: string[];
}

interface UploadVariables {
  photos: string[];
  postFunction: typeof postPhotos;
}

const usePhotos = (onNextStep?: () => void) => {
  const {
    image,
    pickImage,
    loading: galleryLoading,
    clearImage,
  } = useImagePicker(["images"]);

  const [photos, setPhotos] = useState<Set<string>>(new Set());
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const uploadMutation = useMutation<UploadResponse, Error, UploadVariables>({
    mutationFn: (variables) => uploadPhotos(variables),
    onMutate: () => {
      setUploadProgress(0);
    },
    onSuccess: () => {
      onNextStep?.();
    },
    onError: (error) => {
      console.error("Upload failed:", error);
      alert(`Failed to upload photos: ${error.message}`);
    },
    onSettled: () => {
      setUploadProgress(0);
    },
  });

  const selectPhotos = useCallback(() => {
    if (photos.size >= MAX_PHOTOS) {
      return;
    }
    pickImage();
  }, [photos.size, pickImage]);

  const submitPhotos = useCallback(() => {
    const photoArray = Array.from(photos);

    if (photoArray.length === 0) {
      alert("Please select at least one photo");
      return;
    }

    uploadMutation.mutate({
      photos: photoArray,
      postFunction: postPhotos,
    });
  }, [photos, uploadMutation]);

  const removePhoto = useCallback((photoUri: string) => {
    setPhotos(
      (prevPhotos) =>
        new Set([...prevPhotos].filter((photo) => photo !== photoUri)),
    );
  }, []);

  useEffect(() => {
    if (image && photos.size < MAX_PHOTOS && !photos.has(image)) {
      setPhotos((prevPhotos) => new Set([...prevPhotos, image]));
      clearImage();
    }
  }, [image, photos.size, photos, clearImage]);

  const isLoading = galleryLoading || uploadMutation.isPending;

  return {
    loading: isLoading,
    uploadLoading: uploadMutation.isPending,
    uploadProgress,
    photos: Array.from(photos),
    galleryLoading,
    selectPhotos,
    submitPhotos,
    removePhoto,
    canAddMore: photos.size < MAX_PHOTOS,
    remainingSlots: MAX_PHOTOS - photos.size,
    isUploadError: uploadMutation.isError,
    uploadError: uploadMutation.error,
  };
};

export default usePhotos;
