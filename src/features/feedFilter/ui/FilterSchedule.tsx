import { View } from "react-native";
import { RadioGroup, ChipsGroup } from "@/shared/ui";
import { FeedFilterOption } from "../model/types";

const FilterSchedule = ({
  availability,
  timeSlots,
  durations,
  availabilityOptions,
  timeOfDayOptions,
  durationOptions,
  onAvailabilityChange,
  onTimeSlotsChange,
  onDurationsChange,
}: {
  availability: string | null;
  timeSlots: string[];
  durations: string[];
  availabilityOptions: FeedFilterOption[];
  timeOfDayOptions: FeedFilterOption[];
  durationOptions: FeedFilterOption[];
  onAvailabilityChange: (value: string) => void;
  onTimeSlotsChange: (value: string[]) => void;
  onDurationsChange: (value: string[]) => void;
}) => {
  return (
    <View>
      <RadioGroup
        title="Когда"
        options={availabilityOptions.map((option) => ({
          ...option,
          selected: option.value === availability,
        }))}
        onChange={(option) => onAvailabilityChange(option.value)}
      />
      <ChipsGroup
        groupTitle="В какое время"
        items={timeOfDayOptions}
        value={new Set(timeSlots)}
        getId={(item) => item.value}
        getLabel={(item) => item.label}
        onChange={(nextValue) =>
          onTimeSlotsChange(Array.from(nextValue) as string[])
        }
      />
      <ChipsGroup
        groupTitle="Длительность встречи"
        items={durationOptions}
        value={new Set(durations)}
        getId={(item) => item.value}
        getLabel={(item) => item.label}
        onChange={(nextValue) =>
          onDurationsChange(Array.from(nextValue) as string[])
        }
      />
    </View>
  );
};

export default FilterSchedule;
