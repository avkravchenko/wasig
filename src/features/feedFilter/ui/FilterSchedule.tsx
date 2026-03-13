import { View } from "react-native";
import { RadioGroup, Toggler, ChipsGroup } from "@/shared/ui";

const FilterSchedule = () => {
  return (
    <View>
      <RadioGroup
        options={[
          { label: "Сегодня", value: "today", selected: true },
          { label: "Завтра", value: "tomorrow", selected: false },
          { label: "На выходных", value: "weekend", selected: false },
        ]}
        onChange={() => {}}
      />
      <Toggler
        title="Договоримся на неделе"
        checked={false}
        onChange={() => {}}
      />
      <ChipsGroup
        groupTitle="В какое время"
        items={[
          { id: "0", label: "В течение дня" },
          { id: "1", label: "Утро" },
          { id: "2", label: "День" },
          { id: "3", label: "Вечер" },
        ]}
        value={new Set<number>()}
        getId={(item) => Number(item.id)}
        getLabel={(item) => item.label}
        onChange={() => {}}
      />
      <ChipsGroup
        groupTitle="Длительность встречи"
        items={[
          { id: "0", label: "Как пойдет" },
          { id: "1", label: "1 час" },
          { id: "2", label: "2 часа" },
          { id: "3", label: "3 часа" },
        ]}
        value={new Set<number>()}
        getId={(item) => Number(item.id)}
        getLabel={(item) => item.label}
        onChange={() => {}}
      />
    </View>
  );
};

export default FilterSchedule;
