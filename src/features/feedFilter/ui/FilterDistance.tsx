import { RangeFilter } from "@/shared/ui";

const FilterDistance = () => {
  return <RangeFilter title="Расстояние, км" minValue={0} maxValue={100} />;
};

export default FilterDistance;
