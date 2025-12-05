import { Text, View } from "react-native";

const TopBar = () => {
  return (
    <View
      style={{
        height: 50,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          textAlign: "left",
          fontWeight: 600,
          fontSize: 20,
          letterSpacing: 0.48,
        }}
      >
        Логотип
      </Text>
    </View>
  );
};

export default TopBar;
