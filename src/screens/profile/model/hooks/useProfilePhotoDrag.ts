import { useRef, useState } from "react";
import {
  PanResponder,
  type GestureResponderEvent,
  type View,
} from "react-native";
import { reorderProfilePhotoList } from "../lib/profilePhotos";
import {
  arePhotoIdsEqual,
  EMPTY_PHOTO_CELL_LAYOUT,
  EMPTY_PHOTO_GRID_LAYOUT,
  getPhotoByGridPoint,
  getTargetPhotoIndex,
  swapPhotoIds,
  type PhotoCellLayout,
  type PhotoDragState,
  type PhotoGridLayout,
} from "../lib/profilePhotoDrag";
import type { UserProfilePhoto } from "../types";

type UseProfilePhotoDragParams = {
  disabled: boolean;
  onOrderChange: (photoIds: string[], nextMainPhotoId?: string) => void;
  photos: UserProfilePhoto[];
};

type PhotoGridDragContext = {
  cancel: () => void;
  disabled: boolean;
  end: () => void;
  gridLayout: PhotoGridLayout;
  move: (photoId: string, offsetX: number, offsetY: number) => void;
  photoCellLayout: PhotoCellLayout;
  photos: UserProfilePhoto[];
  start: (photoId: string) => void;
};

const getPhotoFromEvent = (
  event: GestureResponderEvent,
  context: PhotoGridDragContext | null,
) => {
  if (!context || context.disabled) {
    return null;
  }

  return getPhotoByGridPoint({
    gridLayout: context.gridLayout,
    pageX: event.nativeEvent.pageX,
    pageY: event.nativeEvent.pageY,
    photoCellLayout: context.photoCellLayout,
    photos: context.photos,
  });
};

const useProfilePhotoDrag = ({
  disabled,
  onOrderChange,
  photos,
}: UseProfilePhotoDragParams) => {
  const [photoCellLayout, setPhotoCellLayout] = useState<PhotoCellLayout>(
    EMPTY_PHOTO_CELL_LAYOUT,
  );
  const [dragState, setDragState] = useState<PhotoDragState | null>(null);
  const [dragPhotoIds, setDragPhotoIds] = useState<string[] | null>(null);
  const dragStartIndexRef = useRef<number | null>(null);
  const dragPhotoIdsRef = useRef<string[] | null>(null);
  const activeDragPhotoIdRef = useRef<string | null>(null);
  const photoGridRef = useRef<View>(null);
  const photoGridLayoutRef = useRef<PhotoGridLayout>(EMPTY_PHOTO_GRID_LAYOUT);
  const dragContextRef = useRef<PhotoGridDragContext | null>(null);
  const displayedPhotos = dragPhotoIds
    ? reorderProfilePhotoList(photos, dragPhotoIds)
    : photos;
  const draggedPhoto = dragState
    ? photos.find((photo) => photo.id === dragState.photoId)
    : undefined;

  const updatePhotoGridLayout = () => {
    photoGridRef.current?.measureInWindow((pageX, pageY) => {
      photoGridLayoutRef.current = { pageX, pageY };

      if (dragContextRef.current) {
        dragContextRef.current.gridLayout = photoGridLayoutRef.current;
      }
    });
  };

  const handlePhotoCellLayout = (width: number, height: number) => {
    if (
      Math.abs(photoCellLayout.width - width) < 1 &&
      Math.abs(photoCellLayout.height - height) < 1
    ) {
      return;
    }

    setPhotoCellLayout({ height, width });
  };

  const handlePhotoDragStart = (photoId: string) => {
    if (
      disabled ||
      photoCellLayout.width <= 0 ||
      photoCellLayout.height <= 0
    ) {
      return;
    }

    const sourceIndex = photos.findIndex((photo) => photo.id === photoId);

    if (sourceIndex < 0) {
      return;
    }

    const photoIds = photos.map((photo) => photo.id);

    dragStartIndexRef.current = sourceIndex;
    dragPhotoIdsRef.current = photoIds;
    setDragPhotoIds(photoIds);
    setDragState({
      offsetX: 0,
      offsetY: 0,
      photoId,
      sourceIndex,
    });
  };

  const handlePhotoDragMove = (
    photoId: string,
    offsetX: number,
    offsetY: number,
  ) => {
    const sourceIndex = dragStartIndexRef.current;
    const currentPhotoIds = dragPhotoIdsRef.current;

    if (
      sourceIndex === null ||
      !currentPhotoIds ||
      photoCellLayout.width <= 0 ||
      photoCellLayout.height <= 0
    ) {
      return;
    }

    const currentIndex = currentPhotoIds.indexOf(photoId);
    const targetIndex = getTargetPhotoIndex({
      offsetX,
      offsetY,
      photoCellLayout,
      photosCount: photos.length,
      sourceIndex,
    });

    setDragState({
      offsetX,
      offsetY,
      photoId,
      sourceIndex,
    });

    if (currentIndex < 0 || targetIndex === currentIndex) {
      return;
    }

    const nextPhotoIds = swapPhotoIds(
      currentPhotoIds,
      currentIndex,
      targetIndex,
    );

    dragPhotoIdsRef.current = nextPhotoIds;
    setDragPhotoIds(nextPhotoIds);
  };

  const handlePhotoDragCancel = () => {
    dragStartIndexRef.current = null;
    dragPhotoIdsRef.current = null;
    activeDragPhotoIdRef.current = null;
    setDragPhotoIds(null);
    setDragState(null);
  };

  const handlePhotoDragEnd = () => {
    const nextPhotoIds = dragPhotoIdsRef.current;
    const currentPhotoIds = photos.map((photo) => photo.id);
    const currentMainPhotoId = photos.find((photo) => photo.isMain)?.id;
    const nextMainPhotoId = nextPhotoIds?.[0];

    handlePhotoDragCancel();

    if (!nextPhotoIds || arePhotoIdsEqual(currentPhotoIds, nextPhotoIds)) {
      return;
    }

    onOrderChange(
      nextPhotoIds,
      nextMainPhotoId !== currentMainPhotoId ? nextMainPhotoId : undefined,
    );
  };

  const photoGridPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (event) =>
        Boolean(getPhotoFromEvent(event, dragContextRef.current)),
      onStartShouldSetPanResponder: (event) =>
        Boolean(getPhotoFromEvent(event, dragContextRef.current)),
      onMoveShouldSetPanResponderCapture: (event) =>
        Boolean(getPhotoFromEvent(event, dragContextRef.current)),
      onMoveShouldSetPanResponder: (event) =>
        Boolean(getPhotoFromEvent(event, dragContextRef.current)),
      onPanResponderGrant: (event) => {
        if (!dragContextRef.current) {
          return;
        }

        photoGridRef.current?.measureInWindow((pageX, pageY) => {
          const context = dragContextRef.current;

          if (!context) {
            return;
          }

          photoGridLayoutRef.current = { pageX, pageY };
          context.gridLayout = photoGridLayoutRef.current;

          const photo = getPhotoFromEvent(event, {
            ...context,
            gridLayout: photoGridLayoutRef.current,
          });

          if (!photo) {
            return;
          }

          activeDragPhotoIdRef.current = photo.id;
          context.start(photo.id);
        });
      },
      onPanResponderMove: (_, gestureState) => {
        const context = dragContextRef.current;
        const photoId = activeDragPhotoIdRef.current;

        if (!context || !photoId) {
          return;
        }

        context.move(photoId, gestureState.dx, gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        const context = dragContextRef.current;
        const photoId = activeDragPhotoIdRef.current;

        if (!context || !photoId) {
          return;
        }

        context.move(photoId, gestureState.dx, gestureState.dy);
        context.end();
        activeDragPhotoIdRef.current = null;
      },
      onPanResponderTerminate: () => {
        const context = dragContextRef.current;

        context?.cancel();
        activeDragPhotoIdRef.current = null;
      },
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,
    }),
  ).current;

  dragContextRef.current = {
    cancel: handlePhotoDragCancel,
    disabled,
    end: handlePhotoDragEnd,
    gridLayout: photoGridLayoutRef.current,
    move: handlePhotoDragMove,
    photoCellLayout,
    photos,
    start: handlePhotoDragStart,
  };

  return {
    displayedPhotos,
    draggedPhoto,
    dragState,
    handlePhotoCellLayout,
    photoCellLayout,
    photoGridPanHandlers: photoGridPanResponder.panHandlers,
    photoGridRef,
    updatePhotoGridLayout,
  };
};

export type ProfilePhotoDragController = ReturnType<
  typeof useProfilePhotoDrag
>;

export default useProfilePhotoDrag;
