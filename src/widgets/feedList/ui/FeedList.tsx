import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import useFeed from "@/features/feed/model/hooks/useFeed";
import Card from "@/features/feedItem";
import { ErrorComponent } from "@/shared/ui";
import { getApiErrorMessage } from "@/shared/api/errors";
import { FeedItem } from "@/entities/feed";

const FeedList = () => {
  const { data, isLoading, isError, error } = useFeed();
  const insets = useSafeAreaInsets();
  const contentTopPadding = insets.top + 16;
  const contentBottomPadding = insets.bottom + 96;
  const renderItem = useCallback(
    ({ item }: { item: FeedItem }) => <Card cardData={item} />,
    [],
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1B7EFF" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <ErrorComponent
          title="Не удалось загрузить ленту"
          description={getApiErrorMessage(error)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.activityId}
        renderItem={renderItem}
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        bounces={false}
        overScrollMode="never"
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Карточки пока не найдены</Text>
          </View>
        }
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: contentTopPadding,
            paddingBottom: contentBottomPadding,
          },
        ]}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
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
  separator: {
    height: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 4,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3B3D4B",
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 14,
    color: "#7E8191",
    textAlign: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});

export default FeedList;
