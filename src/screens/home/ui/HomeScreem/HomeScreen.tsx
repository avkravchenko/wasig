import { StyleSheet, View } from "react-native";
import FeedList from "@/widgets/feedList";

const HomeScreen = () => {
  return (
    <View style={styles.safeArea}>
      <FeedList />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
});

export default HomeScreen;
