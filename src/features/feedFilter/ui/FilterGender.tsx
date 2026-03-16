import { RadioGroup } from "@/shared/ui";
import { FeedFilterOption } from "../model/types";

const FilterGender = ({
  value,
  options,
  onChange,
}: {
  value: string | null;
  options: FeedFilterOption[];
  onChange: (value: string) => void;
}) => {
  return (
    <>
      <RadioGroup
        title="Пол"
        variant="chip"
        options={options.map((option) => ({
          ...option,
          selected: option.value === value,
        }))}
        onChange={(option) => onChange(option.value)}
      />
    </>
  );
};

export default FilterGender;
