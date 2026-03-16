import { Toggler } from "@/shared/ui";

const FilterProfileVerification = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <Toggler title="Профиль подтвержден" checked={value} onChange={onChange} />
  );
};

export default FilterProfileVerification;
