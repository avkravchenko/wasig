import { View } from "react-native";
import { ChipsGroup } from "@/shared/ui";

const FilterConversationStyle = () => {
  return (
    <View>
      <ChipsGroup
        groupTitle="Стиль общения"
        items={[
          { id: "1", label: "Больше слушает" },
          { id: "2", label: "Больше говорит" },
          { id: "3", label: "Равномерно" },
        ]}
        value={new Set<number>()}
        getId={(item) => Number(item.id)}
        getLabel={(item) => item.label}
        onChange={() => {}}
      />
    </View>
  );
};

export default FilterConversationStyle;
