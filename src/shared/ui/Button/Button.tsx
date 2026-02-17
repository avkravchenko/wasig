import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { styles } from "@/shared/ui/Button/ButtonStyles";

type ButtonPropsType = {
  loading?: boolean;
  disabled?: boolean;
  title?: string;
  type?: "primary" | "secondary";
  size?: "sm" | "lg";
  padding?: { x: number; y: number };
  onPress: () => void;
  children?: React.ReactNode;
};

const Button = ({
  loading = false,
  disabled = false,
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
      disabled={disabled || loading}
      style={[
        disabled && styles.disabled,
        styles[type],
        styles[size],
        styles.button,
        { paddingVertical: padding.y, paddingHorizontal: padding.x },
      ]}
    >
      {children}
      {title ? (
        <Text
          style={{
            marginLeft: children ? 8 : 0,
            color: type === "primary" ? "#3B3D4B" : "#fff",
          }}
        >
          {loading ? (
            <>
              <ActivityIndicator
                size="small"
                color={type === "primary" ? "#3B3D4B" : "#fff"}
              />{" "}
              {title}
            </>
          ) : (
            title
          )}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default Button;
