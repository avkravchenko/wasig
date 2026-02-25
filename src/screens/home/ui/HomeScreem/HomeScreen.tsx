import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Feed from "@/features/feed";
import { useEffect } from "react";
import { getAccessToken } from "@/shared/lib/auth";

const HomeScreen = () => {
  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      console.log(token);
    })();
  }, []);
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
