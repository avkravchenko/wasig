import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ErrorComponent } from "@/shared/ui";
import { CardDetails, FeedCard, FeedItem } from "@/entities/feed";
import useFeedPager from "../model/useFeedPager";
import FeedListState from "./FeedListState";

const HORIZONTAL_PADDING = 16;

type FeedListProps = {
  contentBottomPadding: number;
  contentTopPadding: number;
  data: FeedItem[];
  emptyTitle: string;
  errorDescription?: string;
  errorTitle: string;
  isError: boolean;
  isLoading: boolean;
  onRefresh?: () => Promise<unknown> | unknown;
  refreshingText: string;
  resetKey?: string | number;
};

const FeedList = ({
  contentBottomPadding,
  contentTopPadding,
  data,
  emptyTitle,
  errorDescription,
  errorTitle,
  isError,
  isLoading,
  onRefresh,
  refreshingText,
  resetKey,
}: FeedListProps) => {
  const [selectedCard, setSelectedCard] = useState<FeedItem | null>(null);
  const {
    currentIndex,
    handlePagerLayout,
    isRefreshing,
    pageHeight,
    panHandlers,
    stackTranslateY,
    visibleIndices,
  } = useFeedPager({
    itemsCount: data.length,
    onRefresh,
    resetKey,
  });

  const handleOpenCard = useCallback((card: FeedItem) => {
    setSelectedCard(card);
  }, []);

  useEffect(() => {
    setSelectedCard(null);
  }, [resetKey]);

  return (
    <View style={styles.container}>
      <View
        style={styles.pager}
        onLayout={handlePagerLayout}
        {...panHandlers}
      >
        {isLoading ? (
          <FeedListState
            contentBottomPadding={contentBottomPadding}
            contentTopPadding={contentTopPadding}
          >
            <ActivityIndicator size="large" color="#1B7EFF" />
          </FeedListState>
        ) : isError ? (
          <FeedListState
            contentBottomPadding={contentBottomPadding}
            contentTopPadding={contentTopPadding}
          >
            <ErrorComponent title={errorTitle} description={errorDescription} />
          </FeedListState>
        ) : data.length === 0 ? (
          <FeedListState
            contentBottomPadding={contentBottomPadding}
            contentTopPadding={contentTopPadding}
          >
            <Text style={styles.emptyTitle}>{emptyTitle}</Text>
          </FeedListState>
        ) : (
          <Animated.View
            style={[
              styles.stack,
              {
                height: pageHeight * data.length,
                transform: [{ translateY: stackTranslateY }],
              },
            ]}
          >
            {visibleIndices.map((index) => {
              const item = data[index];

              return (
                <View
                  key={item.activityId}
                  pointerEvents={index === currentIndex ? "auto" : "none"}
                  style={[
                    styles.page,
                    {
                      top: index * pageHeight,
                      height: pageHeight,
                      paddingTop: contentTopPadding,
                      paddingBottom: contentBottomPadding,
                      zIndex: index === currentIndex ? 2 : 1,
                    },
                  ]}
                >
                  <View style={styles.pageContent}>
                    <FeedCard cardData={item} onCardPress={handleOpenCard} />
                  </View>
                </View>
              );
            })}
          </Animated.View>
        )}
      </View>
      {isRefreshing ? (
        <View
          pointerEvents="none"
          style={[
            styles.refreshIndicatorWrap,
            { top: contentTopPadding - 8 },
          ]}
        >
          <View style={styles.refreshIndicator}>
            <ActivityIndicator size="small" color="#1B7EFF" />
            <Text style={styles.refreshIndicatorText}>{refreshingText}</Text>
          </View>
        </View>
      ) : null}
      <View pointerEvents="none" style={[styles.gradient, styles.gradientTop]}>
        <LinearGradient
          colors={["rgba(245, 246, 248, 0.55)", "rgba(245, 246, 248, 0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientFill}
        />
      </View>
      <View
        pointerEvents="none"
        style={[styles.gradient, styles.gradientBottom]}
      >
        <LinearGradient
          colors={["rgba(245, 246, 248, 0)", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientFill}
        />
      </View>
      <CardDetails
        cardData={selectedCard}
        isVisible={selectedCard !== null}
        onClose={() => setSelectedCard(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  pager: {
    flex: 1,
    overflow: "hidden",
  },
  stack: {
    flex: 1,
  },
  page: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  pageContent: {
    flex: 1,
    justifyContent: "center",
  },
  refreshIndicatorWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 3,
  },
  refreshIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
  },
  refreshIndicatorText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    color: "#30323E",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 130,
  },
  gradientTop: {
    top: 0,
  },
  gradientBottom: {
    bottom: 0,
  },
  gradientFill: {
    flex: 1,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3B3D4B",
    textAlign: "center",
  },
});

export default FeedList;
