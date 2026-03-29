import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CHAT_ITEMS } from "../model/mocks";
import { ChatList } from "./components/ChatList";
import { ChatsHeader } from "./components/ChatsHeader";

const ChatsScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + 120,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ChatsHeader />
        <Text style={styles.title}>Чаты</Text>
        <ChatList items={CHAT_ITEMS} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ECECF4",
  },
  content: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 14,
  },
});

export default ChatsScreen;
