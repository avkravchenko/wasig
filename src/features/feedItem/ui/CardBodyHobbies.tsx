import { ScrollView, StyleSheet } from "react-native";
import { FeedItem } from "@/entities/feed";
import { Chip } from "@/shared/ui";

type CardBodyHobbiesProps = Pick<FeedItem, "interests">;

const CardBodyHobbies = ({ interests }: CardBodyHobbiesProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
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
  container: {
    paddingHorizontal: 0,
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 4,
  },
});

export default CardBodyHobbies;
