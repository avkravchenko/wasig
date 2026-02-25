import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import useFeed from "../model/hooks/useFeed";
import Card from "@/features/feedItem";
import { ErrorComponent } from "@/shared/ui";
import { getApiErrorMessage } from "@/shared/api/errors";

const FeedList = () => {
  const { data, isLoading, isError, error } = useFeed();

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
    <FlatList
      scrollEnabled={false}
      data={data}
      keyExtractor={(item) => item.activityId}
      renderItem={({ item }) => <Card cardData={item} />}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});

export default FeedList;
