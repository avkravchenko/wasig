import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Feed from "@/features/feed";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Feed />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
});

export default HomeScreen;
