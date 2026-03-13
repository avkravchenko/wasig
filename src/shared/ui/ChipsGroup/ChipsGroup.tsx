import { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import Chip from "../Chip/Chip";

type ChipListProps<T> = {
  items: T[];
  value: Set<number>;
  groupTitle?: string;
  getId: (item: T) => number;
  getLabel: (item: T) => string;
  onChange: (value: Set<number>) => void;
};

export function ChipGroup<T>({
  items,
  value,
  groupTitle,
  getId,
  getLabel,
  onChange,
}: ChipListProps<T>) {
  const toggle = useCallback(
    (id: number) => {
      const next = new Set(value);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      onChange(next);
    },
    [onChange, value],
  );
  const renderItem = useCallback(
    ({ item }: { item: T }) => (
      <Chip
        title={getLabel(item)}
        selected={value.has(getId(item))}
        onPress={() => toggle(getId(item))}
      />
    ),
    [getId, getLabel, toggle, value],
  );

  return (
    <View style={{ marginVertical: 16, gap: 8, minWidth: "100%" }}>
      {groupTitle && <Text>{groupTitle}</Text>}
      <FlatList
        data={items}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(getId(item))}
        renderItem={renderItem}
        style={{ flexDirection: "row", flexWrap: "wrap" }}
      />
    </View>
  );
}

export default ChipGroup;
