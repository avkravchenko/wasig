import { Pressable, StyleSheet, Text } from "react-native";
import useLogout from "../model/useLogout";

const LogoutButton = () => {
  const { isLoggingOut, logout } = useLogout();

  return (
    <Pressable
      style={[styles.button, isLoggingOut ? styles.buttonDisabled : null]}
      disabled={isLoggingOut}
      accessibilityRole="button"
      onPress={() => void logout()}
    >
      <Text style={styles.buttonText}>
        {isLoggingOut ? "Выходим" : "Выйти"}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E2EB",
  },
  buttonDisabled: {
    opacity: 0.72,
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: "#3B3D4B",
  },
});

export default LogoutButton;
