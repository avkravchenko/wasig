import { StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 16,
    letterSpacing: 0.5,
  },
  hintText: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 8,
    letterSpacing: 0.5,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    textAlign: "center",
  },
});

export default commonStyles;
