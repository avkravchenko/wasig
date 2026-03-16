import { StyleSheet, Switch, Text, View } from "react-native";

const Toggler = ({
  title,
  checked,
  onChange,
}: {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Switch value={checked} onValueChange={onChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Toggler;
