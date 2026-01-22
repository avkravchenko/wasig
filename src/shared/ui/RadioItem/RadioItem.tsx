import { Text, View, TouchableOpacity } from "react-native";

interface RadioItemProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const RadioItem = ({ label, selected, onPress }: RadioItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
    >
      <View style={{ flex: 1 }}>
        <Text>{label}</Text>
      </View>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: selected ? "#30323E" : "#E7EAEF",
          backgroundColor: selected ? "#30323E" : "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selected && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "white",
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RadioItem;
