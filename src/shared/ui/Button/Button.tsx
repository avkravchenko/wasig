import { Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { styles } from "@/shared/ui/Button/ButtonStyles";

type ButtonPropsType = {
  title?: string;
  type?: "primary" | "secondary";
  size?: "sm" | "lg";
  padding?: { x: number; y: number };
  onPress: () => void;
  children?: React.ReactNode;
};

const Button = ({
  title = "",
  type = "primary",
  size = "sm",
  onPress,
  padding = { x: 0, y: 0 },
  children,
}: ButtonPropsType) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles[type],
        styles[size],
        styles.button,
        { paddingVertical: padding.y, paddingHorizontal: padding.x },
      ]}
    >
      {children}
      {title ? (
        <Text style={{ marginLeft: children ? 8 : 0 }}>{title}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default Button;
