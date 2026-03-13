import { FlatList, StyleSheet, View } from "react-native";
import FilterGender from "./FilterGender";
import FilterAge from "./FilterAge";
import FilterDistance from "./FilterDistance";
import FilterMeetingGoal from "./FilterMeetingGoal";
import { Toggler } from "@/shared/ui";
import FilterSchedule from "./FilterSchedule";
import FilterConversationStyle from "./FilterConversationStyle";
import FilterProfileVerification from "./FilterProfileVerification";

const sections = [
  {
    key: "main",
    content: (
      <>
        <FilterGender />
        <FilterAge />
        <FilterDistance />
      </>
    ),
  },
  {
    key: "meeting-goal",
    content: <FilterMeetingGoal />,
  },
  {
    key: "history",
    content: (
      <Toggler title="Есть история" checked={false} onChange={() => {}} />
    ),
  },
  { key: "schedule", content: <FilterSchedule /> },
  { key: "conversation-style", content: <FilterConversationStyle /> },
  { key: "profile-verification", content: <FilterProfileVerification /> },
];

const FeedFilter = () => {
  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View style={styles.section}>{item.content}</View>
      )}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingVertical: 16,
  },
  section: {
    gap: 30,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
  },
});

export default FeedFilter;
