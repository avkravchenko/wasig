import { View, StyleSheet } from "react-native";
import Chip from "../Chip/Chip";
import RadioItem from "../RadioItem/RadioItem";

type RadioGroupProps<
  T extends { label: string; value: any; selected: boolean },
> = {
  options: T[];
  onChange: (value: T) => void;
  variant?: "default" | "chip";
};

const RadioGroup = <
  T extends { label: string; value: any; selected: boolean },
>({
  options,
  onChange,
  variant = "default",
}: RadioGroupProps<T>) => {
  return (
    <View style={variant === "chip" ? styles.chipContainer : styles.container}>
      {options.map((item) =>
        variant === "chip" ? (
          <Chip
            key={String(item.value)}
            title={item.label}
            selected={item.selected}
            onPress={() => onChange(item)}
          />
        ) : (
          <RadioItem
            key={String(item.value)}
            label={item.label}
            selected={item.selected}
            onPress={() => onChange(item)}
          />
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
});

export default RadioGroup;
