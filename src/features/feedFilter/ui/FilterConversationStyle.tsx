import { View } from "react-native";
import { RadioGroup } from "@/shared/ui";
import { FeedFilterOption } from "../model/types";

const FilterConversationStyle = ({
  value,
  options,
  onChange,
}: {
  value: string | null;
  options: FeedFilterOption[];
  onChange: (value: string) => void;
}) => {
  return (
    <View>
      <RadioGroup
        title="Стиль общения"
        variant="chip"
        options={options.map((option) => ({
          ...option,
          selected: option.value === value,
        }))}
        onChange={(option) => onChange(option.value)}
      />
    </View>
  );
};

export default FilterConversationStyle;
