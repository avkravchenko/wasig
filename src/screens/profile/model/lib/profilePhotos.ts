import { API_URL } from "@/shared/constants/apiConstants";
import type { UserProfilePhoto } from "../types";

const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+\-.]*:/i;

export const normalizeProfilePhotoUrl = (url?: string | null) => {
  const trimmedUrl = url?.trim();

  if (!trimmedUrl) {
    return null;
  }

  if (ABSOLUTE_URL_PATTERN.test(trimmedUrl)) {
    return trimmedUrl;
  }

  if (trimmedUrl.startsWith("//")) {
    const [protocol] = API_URL.split(":");

    return `${protocol}:${trimmedUrl}`;
  }

  const baseUrl = API_URL.replace(/\/+$/, "");
  const photoPath = trimmedUrl.startsWith("/") ? trimmedUrl : `/${trimmedUrl}`;

  return `${baseUrl}${photoPath}`;
};

export const normalizeProfilePhoto = (
  photo: UserProfilePhoto,
  index = 0,
): UserProfilePhoto | null => {
  const photoUrl = normalizeProfilePhotoUrl(photo.url);

  if (!photoUrl) {
    return null;
  }

  return {
    ...photo,
    url: photoUrl,
    thumbnailUrl: normalizeProfilePhotoUrl(photo.thumbnailUrl) ?? photoUrl,
    position: photo.position ?? index + 1,
    isMain: photo.isMain ?? index === 0,
  };
};

export const getPhotoUri = (photo?: UserProfilePhoto) =>
  photo?.thumbnailUrl || photo?.url || undefined;

export const getProfilePhotos = (photos: UserProfilePhoto[] = []) =>
  [...photos].sort((left, right) => left.position - right.position);

export const getMainProfilePhoto = (photos: UserProfilePhoto[] = []) => {
  const sortedPhotos = getProfilePhotos(photos);

  return sortedPhotos.find((photo) => photo.isMain) ?? sortedPhotos[0];
};

export const applyProfilePhotoPositions = (photos: UserProfilePhoto[]) =>
  photos.map((photo, index) => ({
    ...photo,
    position: index + 1,
  }));

export const reorderProfilePhotoList = (
  photos: UserProfilePhoto[] = [],
  photoIds: string[],
) => {
  const photosById = new Map(photos.map((photo) => [photo.id, photo]));
  const nextPhotoIds = new Set(photoIds);
  const orderedPhotos = photoIds
    .map((photoId) => photosById.get(photoId))
    .filter((photo): photo is UserProfilePhoto => Boolean(photo));
  const remainingPhotos = getProfilePhotos(photos).filter(
    (photo) => !nextPhotoIds.has(photo.id),
  );

  return applyProfilePhotoPositions([...orderedPhotos, ...remainingPhotos]);
};

export const setMainProfilePhotoInList = (
  photos: UserProfilePhoto[] = [],
  photoId: string,
) =>
  photos.map((photo) => ({
    ...photo,
    isMain: photo.id === photoId,
  }));
