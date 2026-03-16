import { Text, View, StyleSheet } from "react-native";
import Chip from "../Chip/Chip";
import RadioItem from "../RadioItem/RadioItem";

type RadioGroupProps<
  T extends { label: string; value: any; selected: boolean },
> = {
  options: T[];
  onChange: (value: T) => void;
  variant?: "default" | "chip";
  title?: string;
  label?: string;
};

const RadioGroup = <
  T extends { label: string; value: any; selected: boolean },
>({
  options,
  onChange,
  variant = "default",
  title,
  label,
}: RadioGroupProps<T>) => {
  const resolvedTitle = title ?? label;

  return (
    <View style={styles.container}>
      {resolvedTitle && <Text style={styles.title}>{resolvedTitle}</Text>}
      <View style={variant === "chip" ? styles.chipContainer : styles.optionsContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    marginBottom: 8,
  },
  optionsContainer: {
    width: "100%",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
});

export default RadioGroup;
