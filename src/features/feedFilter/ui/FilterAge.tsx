import { RangeFilter } from "@/shared/ui";

const MIN_AGE = 18;
const MAX_AGE = 100;

const FilterAge = () => {
  return (
    <RangeFilter
      title="Возраст, лет"
      minValue={MIN_AGE}
      maxValue={MAX_AGE}
    />
  );
};

export default FilterAge;
