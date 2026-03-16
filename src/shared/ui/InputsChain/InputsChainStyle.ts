import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
  },
  hiddenInput: {
    width: "100%",
    height: 48,
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1,
    color: "transparent",
    backgroundColor: "transparent",
  },
});

export default styles;
