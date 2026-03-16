import { RangeFilter } from "@/shared/ui";

const FilterAge = ({
  value,
  minValue,
  maxValue,
  onChange,
}: {
  value: [number, number];
  minValue: number;
  maxValue: number;
  onChange: (value: [number, number]) => void;
}) => {
  return (
    <RangeFilter
      title="Возраст, лет"
      minValue={minValue}
      maxValue={maxValue}
      value={value}
      onChange={onChange}
    />
  );
};

export default FilterAge;
