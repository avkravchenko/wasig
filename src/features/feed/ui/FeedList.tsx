import { FlatList, StyleSheet } from "react-native";
import useFeed from "../model/hooks/useFeed";
import Card from "@/features/feedItem";

const FeedList = () => {
  const { data } = useFeed();
  return (
    <FlatList
      scrollEnabled={false}
      data={data}
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
});

export default FeedList;
