import { RangeFilter } from "@/shared/ui";

const FilterDistance = ({
  value,
  maxValue,
  onChange,
}: {
  value: [number, number];
  maxValue: number;
  onChange: (value: [number, number]) => void;
}) => {
  return (
    <RangeFilter
      title="Расстояние, км"
      minValue={0}
      maxValue={maxValue}
      value={value}
      onChange={onChange}
    />
  );
};

export default FilterDistance;
