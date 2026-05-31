import type { UserProfilePhoto } from "../types";

export const PROFILE_PHOTO_SLOTS_COUNT = 6;
export const PROFILE_PHOTO_GRID_COLUMNS = 3;
export const PROFILE_PHOTO_TILE_HORIZONTAL_GAP = 5;
export const PROFILE_PHOTO_TILE_VERTICAL_GAP = 10;
export const PROFILE_PHOTO_DELETE_TOUCH_SIZE = 54;

export type PhotoDragState = {
  offsetX: number;
  offsetY: number;
  photoId: string;
  sourceIndex: number;
};

export type PhotoCellLayout = {
  height: number;
  width: number;
};

export type PhotoGridLayout = {
  pageX: number;
  pageY: number;
};

export const EMPTY_PHOTO_CELL_LAYOUT: PhotoCellLayout = {
  height: 0,
  width: 0,
};

export const EMPTY_PHOTO_GRID_LAYOUT: PhotoGridLayout = {
  pageX: 0,
  pageY: 0,
};

export const arePhotoIdsEqual = (left: string[], right: string[]) =>
  left.length === right.length &&
  left.every((photoId, index) => photoId === right[index]);

export const getPhotoTileSlots = ({
  canAddPhoto,
  isDragging,
  photoCount,
}: {
  canAddPhoto: boolean;
  isDragging: boolean;
  photoCount: number;
}) =>
  Array.from(
    {
      length: Math.min(
        photoCount + (canAddPhoto && !isDragging ? 1 : 0),
        PROFILE_PHOTO_SLOTS_COUNT,
      ),
    },
    (_, index) => index,
  );

export const getPhotoIndexByGridPoint = ({
  gridLayout,
  pageX,
  pageY,
  photoCellLayout,
  photosCount,
}: {
  gridLayout: PhotoGridLayout;
  pageX: number;
  pageY: number;
  photoCellLayout: PhotoCellLayout;
  photosCount: number;
}) => {
  if (photoCellLayout.width <= 0 || photoCellLayout.height <= 0) {
    return -1;
  }

  const locationX = pageX - gridLayout.pageX;
  const locationY = pageY - gridLayout.pageY;
  const rowStep = photoCellLayout.height + PROFILE_PHOTO_TILE_VERTICAL_GAP;
  const column = Math.floor(locationX / photoCellLayout.width);
  const row = Math.floor(locationY / rowStep);
  const rowOffset = locationY - row * rowStep;
  const columnOffset = locationX - column * photoCellLayout.width;

  if (
    column < 0 ||
    column >= PROFILE_PHOTO_GRID_COLUMNS ||
    rowOffset < 0 ||
    rowOffset > photoCellLayout.height ||
    (columnOffset >=
      photoCellLayout.width - PROFILE_PHOTO_DELETE_TOUCH_SIZE &&
      rowOffset <= PROFILE_PHOTO_DELETE_TOUCH_SIZE)
  ) {
    return -1;
  }

  const photoIndex = row * PROFILE_PHOTO_GRID_COLUMNS + column;

  return photoIndex < photosCount ? photoIndex : -1;
};

export const getTargetPhotoIndex = ({
  offsetX,
  offsetY,
  photoCellLayout,
  photosCount,
  sourceIndex,
}: {
  offsetX: number;
  offsetY: number;
  photoCellLayout: PhotoCellLayout;
  photosCount: number;
  sourceIndex: number;
}) => {
  const sourceColumn = sourceIndex % PROFILE_PHOTO_GRID_COLUMNS;
  const sourceRow = Math.floor(sourceIndex / PROFILE_PHOTO_GRID_COLUMNS);
  const targetColumn = Math.max(
    0,
    Math.min(
      sourceColumn + Math.round(offsetX / photoCellLayout.width),
      PROFILE_PHOTO_GRID_COLUMNS - 1,
    ),
  );
  const rowStep = photoCellLayout.height + PROFILE_PHOTO_TILE_VERTICAL_GAP;
  const targetRow = Math.max(
    0,
    Math.min(
      sourceRow + Math.round(offsetY / rowStep),
      Math.ceil(photosCount / PROFILE_PHOTO_GRID_COLUMNS) - 1,
    ),
  );

  return Math.max(
    0,
    Math.min(
      targetRow * PROFILE_PHOTO_GRID_COLUMNS + targetColumn,
      photosCount - 1,
    ),
  );
};

export const swapPhotoIds = (
  photoIds: string[],
  fromIndex: number,
  toIndex: number,
) => {
  const nextPhotoIds = [...photoIds];
  const targetPhotoId = nextPhotoIds[toIndex];

  nextPhotoIds[toIndex] = nextPhotoIds[fromIndex];
  nextPhotoIds[fromIndex] = targetPhotoId;

  return nextPhotoIds;
};

export const getPhotoByGridPoint = ({
  gridLayout,
  pageX,
  pageY,
  photoCellLayout,
  photos,
}: {
  gridLayout: PhotoGridLayout;
  pageX: number;
  pageY: number;
  photoCellLayout: PhotoCellLayout;
  photos: UserProfilePhoto[];
}) => {
  const photoIndex = getPhotoIndexByGridPoint({
    gridLayout,
    pageX,
    pageY,
    photoCellLayout,
    photosCount: photos.length,
  });

  return photoIndex >= 0 ? photos[photoIndex] : null;
};
