import { RadioGroup } from "@/shared/ui";
import { Text } from "react-native";

const FilterGender = () => {
  return (
    <>
      <Text>Пол</Text>
      <RadioGroup
        variant="chip"
        options={[
          { label: "Неважно", value: "any", selected: true },
          { label: "Женщины", value: "female", selected: false },
          { label: "Мужчины", value: "male", selected: false },
        ]}
        onChange={() => {}}
      />
    </>
  );
};

export default FilterGender;
