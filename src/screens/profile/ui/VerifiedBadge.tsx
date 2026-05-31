import { StyleSheet, Text, View } from "react-native";

const VerifiedBadge = () => {
  return (
    <View style={styles.verifiedBadge}>
      <Text style={styles.verifiedIcon}>✓</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  verifiedBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#4D4D56",
    alignItems: "center",
    justifyContent: "center",
  },
  verifiedIcon: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

export default VerifiedBadge;
