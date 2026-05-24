import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  PanResponder,
} from "react-native";

const SWIPE_THRESHOLD = 10;
const SWIPE_VELOCITY = 0.22;
const TRANSITION_DURATION = 260;
const RESET_DURATION = 220;
const PULL_DOWN_LIMIT = 92;
const EDGE_RESISTANCE = 0.3;

type UseFeedPagerParams = {
  itemsCount: number;
  onRefresh?: () => Promise<unknown> | unknown;
  resetKey?: string | number;
};

const useFeedPager = ({
  itemsCount,
  onRefresh,
  resetKey,
}: UseFeedPagerParams) => {
  const stackTranslateY = useRef(new Animated.Value(0)).current;
  const currentIndexRef = useRef(0);
  const refreshInFlightRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pageHeight = Math.max(viewportHeight, 1);

  const clampIndex = useCallback(
    (index: number) =>
      Math.max(0, Math.min(index, Math.max(0, itemsCount - 1))),
    [itemsCount],
  );

  const syncCurrentIndex = useCallback(
    (index: number) => {
      const targetIndex = clampIndex(index);
      currentIndexRef.current = targetIndex;
      setCurrentIndex((currentValue) =>
        currentValue === targetIndex ? currentValue : targetIndex,
      );
    },
    [clampIndex],
  );

  const animateStackTo = useCallback(
    (
      toValue: number,
      options?: {
        duration?: number;
        onComplete?: () => void;
      },
    ) => {
      isAnimatingRef.current = true;

      Animated.timing(stackTranslateY, {
        toValue,
        duration: options?.duration ?? TRANSITION_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        isAnimatingRef.current = false;

        if (!finished) {
          return;
        }

        options?.onComplete?.();
      });
    },
    [stackTranslateY],
  );

  const handleRefresh = useCallback(async () => {
    if (refreshInFlightRef.current || !onRefresh) {
      return;
    }

    refreshInFlightRef.current = true;
    setIsRefreshing(true);

    try {
      await onRefresh();
    } finally {
      refreshInFlightRef.current = false;
      setIsRefreshing(false);
    }
  }, [onRefresh]);

  const handlePagerLayout = useCallback((event: LayoutChangeEvent) => {
    const nextHeight = event.nativeEvent.layout.height;
    setViewportHeight((currentHeight) =>
      Math.abs(currentHeight - nextHeight) < 1 ? currentHeight : nextHeight,
    );
  }, []);

  const panHandlers = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          if (isAnimatingRef.current || isRefreshing || itemsCount === 0) {
            return false;
          }

          return (
            Math.abs(gestureState.dy) > 4 &&
            Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
          );
        },
        onPanResponderMove: (_, gestureState) => {
          const lastIndex = Math.max(0, itemsCount - 1);
          const atFirstCard = currentIndexRef.current === 0;
          const atLastCard = currentIndexRef.current === lastIndex;
          const baseOffset = -currentIndexRef.current * pageHeight;
          let nextDragOffset = gestureState.dy;

          if (atFirstCard && nextDragOffset > 0) {
            nextDragOffset = Math.min(nextDragOffset, PULL_DOWN_LIMIT);
          } else if (atLastCard && nextDragOffset < 0) {
            nextDragOffset *= EDGE_RESISTANCE;
          }

          stackTranslateY.setValue(baseOffset + nextDragOffset);
        },
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: (_, gestureState) => {
          const lastIndex = Math.max(0, itemsCount - 1);
          const atFirstCard = currentIndexRef.current === 0;
          const atLastCard = currentIndexRef.current === lastIndex;
          const dragDistance = gestureState.dy;
          const dragVelocity = gestureState.vy;

          if (
            atFirstCard &&
            dragDistance > SWIPE_THRESHOLD &&
            dragVelocity >= -SWIPE_VELOCITY
          ) {
            animateStackTo(0, { duration: RESET_DURATION });
            void handleRefresh();
            return;
          }

          if (
            !atLastCard &&
            (dragDistance < -SWIPE_THRESHOLD || dragVelocity < -SWIPE_VELOCITY)
          ) {
            const targetIndex = currentIndexRef.current + 1;
            animateStackTo(-targetIndex * pageHeight, {
              onComplete: () => {
                syncCurrentIndex(targetIndex);
              },
            });
            return;
          }

          if (
            !atFirstCard &&
            (dragDistance > SWIPE_THRESHOLD || dragVelocity > SWIPE_VELOCITY)
          ) {
            const targetIndex = currentIndexRef.current - 1;
            animateStackTo(-targetIndex * pageHeight, {
              onComplete: () => {
                syncCurrentIndex(targetIndex);
              },
            });
            return;
          }

          animateStackTo(-currentIndexRef.current * pageHeight, {
            duration: RESET_DURATION,
          });
        },
        onPanResponderTerminate: () => {
          animateStackTo(-currentIndexRef.current * pageHeight, {
            duration: RESET_DURATION,
          });
        },
      }).panHandlers,
    [
      animateStackTo,
      handleRefresh,
      isRefreshing,
      itemsCount,
      pageHeight,
      stackTranslateY,
      syncCurrentIndex,
    ],
  );

  const visibleIndices = useMemo(() => {
    const indices = [
      currentIndex - 1,
      currentIndex,
      currentIndex + 1,
    ].filter((index) => index >= 0 && index < itemsCount);

    return Array.from(new Set(indices));
  }, [currentIndex, itemsCount]);

  useEffect(() => {
    const targetIndex = clampIndex(currentIndexRef.current);

    syncCurrentIndex(targetIndex);
    stackTranslateY.setValue(-targetIndex * pageHeight);
  }, [clampIndex, itemsCount, pageHeight, stackTranslateY, syncCurrentIndex]);

  useEffect(() => {
    syncCurrentIndex(0);
    stackTranslateY.setValue(0);
  }, [resetKey, stackTranslateY, syncCurrentIndex]);

  return {
    currentIndex,
    handlePagerLayout,
    isRefreshing,
    pageHeight,
    panHandlers,
    stackTranslateY,
    visibleIndices,
  };
};

export default useFeedPager;
