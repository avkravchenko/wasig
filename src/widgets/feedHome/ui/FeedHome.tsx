import { useCallback, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CreateActivityForm from "@/features/feed/ui/CreateActivityForm";
import useFeedHomeData from "@/features/feed/model/hooks/useFeedHomeData";
import FeedList from "@/widgets/feedList";
import FeedProfileHeader from "@/widgets/feedProfileHeader";

const HORIZONTAL_PADDING = 16;
const HEADER_GAP = 16;
const DEFAULT_CONTENT_BOTTOM_PADDING = 96;

const FeedHome = () => {
  const feed = useFeedHomeData();
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isCreateActivityVisible, setIsCreateActivityVisible] = useState(false);
  const headerTopOffset = insets.top + 16;
  const contentTopPadding = headerTopOffset + headerHeight + HEADER_GAP;
  const contentBottomPadding = insets.bottom + DEFAULT_CONTENT_BOTTOM_PADDING;

  const handleHeaderLayout = useCallback((event: LayoutChangeEvent) => {
    const nextHeight = event.nativeEvent.layout.height;
    setHeaderHeight((currentHeight) =>
      Math.abs(currentHeight - nextHeight) < 1 ? currentHeight : nextHeight,
    );
  }, []);

  return (
    <View style={styles.container}>
      <FeedList
        contentBottomPadding={contentBottomPadding}
        contentTopPadding={contentTopPadding}
        data={feed.data}
        emptyTitle={feed.emptyTitle}
        errorDescription={feed.errorDescription}
        errorTitle={feed.errorTitle}
        isError={feed.isError}
        isLoading={feed.isLoading}
        onRefresh={feed.refetch}
        refreshingText={feed.refreshingText}
        resetKey={feed.feedMode}
      />
      <View style={[styles.headerWrap, { top: headerTopOffset }]}>
        <View onLayout={handleHeaderLayout}>
          <FeedProfileHeader
            onCreateActivityPress={() => setIsCreateActivityVisible(true)}
          />
        </View>
      </View>
      <CreateActivityForm
        isVisible={isCreateActivityVisible}
        onClose={() => setIsCreateActivityVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  headerWrap: {
    position: "absolute",
    left: HORIZONTAL_PADDING,
    right: HORIZONTAL_PADDING,
    zIndex: 2,
  },
});

export default FeedHome;
