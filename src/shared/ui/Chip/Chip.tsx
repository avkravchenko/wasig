import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ChipProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}

const Chip = ({ title, selected, onPress }: ChipProps) => {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selectedChip]}
      onPress={onPress}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#E7EAEF",
    margin: 4,
  },
  text: {
    fontSize: 14,
    color: "#3B3D4B",
  },
  selectedChip: {
    backgroundColor: "#30323E",
    borderColor: "#30323E",
  },
  selectedText: {
    color: "#fff",
  },
});

export default Chip;
