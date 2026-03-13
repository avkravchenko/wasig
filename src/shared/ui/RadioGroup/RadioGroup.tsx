import { useCallback } from "react";
import { FlatList } from "react-native";
import RadioItem from "../RadioItem/RadioItem";

type RadioGroupProps<
  T extends { label: string; value: any; selected: boolean }
> = {
  options: T[];
  onChange: (value: T) => void;
};

const RadioGroup = <
  T extends { label: string; value: any; selected: boolean }
>({
  options,
  onChange,
}: RadioGroupProps<T>) => {
  const renderItem = useCallback(
    ({ item }: { item: T }) => (
      <RadioItem
        label={item.label}
        selected={item.selected}
        onPress={() => onChange(item)}
      />
    ),
    [onChange],
  );

  return (
    <FlatList
      data={options}
      renderItem={renderItem}
    />
  );
};

export default RadioGroup;
