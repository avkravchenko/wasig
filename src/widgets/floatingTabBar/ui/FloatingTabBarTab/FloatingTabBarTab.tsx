import { Pressable, StyleSheet, Text, View } from "react-native";

type FloatingTabBarTabProps = {
  isFocused: boolean;
  label: string;
  onPress: () => void;
  onLongPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
  badgeCount?: number;
};

const FloatingTabBarTab = ({
  isFocused,
  label,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
  badgeCount,
}: FloatingTabBarTabProps) => {
  const shouldShowBadge = typeof badgeCount === "number" && badgeCount > 0;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.tabButton, isFocused && styles.tabButtonActive]}
    >
      <View style={[styles.tabDot, isFocused && styles.tabDotActive]} />
      {isFocused ? (
        <Text style={styles.tabLabel} numberOfLines={1}>
          {label}
        </Text>
      ) : null}
      {shouldShowBadge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    width: 46,
    minHeight: 46,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flexShrink: 0,
  },
  tabButtonActive: {
    width: "auto",
    backgroundColor: "#E4E8EF",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
  },
  tabDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#B8BFCC",
  },
  tabDotActive: {
    backgroundColor: "#34394A",
  },
  tabLabel: {
    marginLeft: 12,
    flexShrink: 0,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
    color: "#34394A",
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 10,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#34394A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "700",
  },
});

export default FloatingTabBarTab;
