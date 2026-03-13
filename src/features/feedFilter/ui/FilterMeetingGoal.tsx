import { Text, View } from "react-native";
import { ChipsGroup } from "@/shared/ui";

const FilterMeetingGoal = () => {
  return (
    <View>
      <Text>Цель встречи</Text>
      <ChipsGroup
        items={[
          { id: "1", label: "Познакомиться" },
          { id: "2", label: "Пообщаться" },
          { id: "3", label: "Повстречаться" },
        ]}
        value={new Set<number>()}
        getId={(item) => Number(item.id)}
        getLabel={(item) => item.label}
        onChange={() => {}}
      />
    </View>
  );
};

export default FilterMeetingGoal;
