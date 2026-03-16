import { Text, View } from "react-native";
import { ChipsGroup } from "@/shared/ui";
import { FeedFilterOption } from "../model/types";

const FilterMeetingGoal = ({
  value,
  options,
  onChange,
}: {
  value: string[];
  options: FeedFilterOption[];
  onChange: (value: string[]) => void;
}) => {
  return (
    <View>
      <Text>Цель встречи</Text>
      <ChipsGroup
        items={options}
        value={new Set(value)}
        getId={(item) => item.value}
        getLabel={(item) => item.label}
        onChange={(nextValue) => onChange(Array.from(nextValue) as string[])}
      />
    </View>
  );
};

export default FilterMeetingGoal;
