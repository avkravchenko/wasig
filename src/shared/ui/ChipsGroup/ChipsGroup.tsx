import { useCallback } from "react";
import { Text, View } from "react-native";
import Chip from "../Chip/Chip";

type ChipValue = number | string;

type ChipListProps<T, Id extends ChipValue = number> = {
  items: T[];
  value: Set<Id>;
  groupTitle?: string;
  getId: (item: T) => Id;
  getLabel: (item: T) => string;
  onChange: (value: Set<Id>) => void;
};

export function ChipGroup<T, Id extends ChipValue = number>({
  items,
  value,
  groupTitle,
  getId,
  getLabel,
  onChange,
}: ChipListProps<T, Id>) {
  const toggle = useCallback(
    (id: Id) => {
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
    (item: T) => (
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
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {items.map((item) => (
          <View key={String(getId(item))}>{renderItem(item)}</View>
        ))}
      </View>
    </View>
  );
}

export default ChipGroup;
