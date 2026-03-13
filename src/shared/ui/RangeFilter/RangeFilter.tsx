import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RangeSlider } from "@react-native-assets/slider";

type RangeFilterProps = {
  title?: string;
  minValue?: number;
  maxValue?: number;
};

const RangeFilter = ({
  title = "Диапазон",
  minValue = 0,
  maxValue = 100,
}: RangeFilterProps) => {
  const [range, setRange] = useState<[number, number]>([minValue, maxValue]);

  useEffect(() => {
    setRange([minValue, maxValue]);
  }, [minValue, maxValue]);

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text>{title}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.valueChip}>от {range[0]}</Text>
        <Text style={styles.valueChip}>до {range[1]}</Text>
      </View>

      <View style={styles.sliderContainer}>
        <RangeSlider
          range={range}
          style={styles.slider}
          step={1}
          minimumRange={1}
          minimumValue={minValue}
          maximumValue={maxValue}
          outboundColor="#F2F4F8"
          inboundColor="#000000"
          thumbTintColor="#000000"
          trackHeight={4}
          thumbSize={16}
          onValueChange={setRange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 12,
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  valueChip: {
    color: "#666",
    backgroundColor: "#F2F4F8",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
  },
  sliderContainer: {
    width: "100%",
  },
  slider: {
    width: "100%",
    minHeight: 36,
  },
});

export default RangeFilter;
