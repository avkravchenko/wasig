import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chip } from "@/shared/ui";
import { ActiveFilterChip } from "../lib/filterUtils";

interface ActiveFiltersSectionProps {
  chips: ActiveFilterChip[];
  elevated?: boolean;
  hidden?: boolean;
  onResetAll: () => void;
}

const ActiveFiltersSection = ({
  chips,
  elevated = false,
  hidden = false,
  onResetAll,
}: ActiveFiltersSectionProps) => {
  return (
    <View
      style={[
        styles.root,
        elevated && styles.elevated,
        hidden && styles.hidden,
      ]}
    >
      <Text style={styles.title}>Выбранные фильтры</Text>
      <View style={styles.list}>
        {chips.map((chip) => (
          <Chip key={chip.key} title={chip.title} selected onPress={chip.onPress} />
        ))}
        <Chip
          key="reset-all"
          title="Сбросить все"
          selected={false}
          onPress={onResetAll}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    zIndex: 1,
  },
  elevated: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  hidden: {
    opacity: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#30323E",
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: -4,
  },
});

export default memo(ActiveFiltersSection);
