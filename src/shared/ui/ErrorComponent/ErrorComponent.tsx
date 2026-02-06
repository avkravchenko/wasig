import { Text, View } from "react-native";

const ErrorComponent = ({
  title = "Ops",
  description = "Something went wrong",
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
      <Text style={{ fontSize: 16 }}>{description}</Text>
    </View>
  );
};

export default ErrorComponent;
