import { StyleSheet, View } from "react-native";
import FeedHome from "@/widgets/feedHome";

const HomeScreen = () => {
  return (
    <View style={styles.safeArea}>
      <FeedHome />
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
