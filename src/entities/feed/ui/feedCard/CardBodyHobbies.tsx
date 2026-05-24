import { ScrollView, StyleSheet } from "react-native";
import type { FeedItem } from "../../model/types";
import { Chip } from "@/shared/ui";

type CardBodyHobbiesProps = Pick<FeedItem, "interests">;

const CardBodyHobbies = ({ interests }: CardBodyHobbiesProps) => {
  return (
    <ScrollView
      style={styles.scroll}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      alwaysBounceHorizontal={false}
    >
      {interests.map((interest) => (
        <Chip
          key={interest.id}
          title={interest.name}
          selected={false}
          onPress={() => {}}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
    minHeight: 40,
    maxHeight: 40,
  },
  container: {
    paddingHorizontal: 0,
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 4,
    alignItems: "center",
  },
});

export default CardBodyHobbies;
