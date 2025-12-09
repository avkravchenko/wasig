import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 100,
  },
  primary: {
    borderColor: "#F3F5F7",
    backgroundColor: "#F3F5F7",
    height: 48,
    width: 319,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  sm: {
    maxWidth: 77,
    height: 48,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  lg: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  center: {
    textAlign: "center",
  },
  left: {
    textAlign: "left",
  },
  invalid: {
    backgroundColor: "#FBECEC",
    borderColor: "#FBECEC",
  },
  valid: {
    backgroundColor: "#F3F5F7",
    borderColor: "#F3F5F7",
  },
  confirmed: {
    backgroundColor: "#ECF4E0",
    borderColor: "#ECF4E0",
  },
});
