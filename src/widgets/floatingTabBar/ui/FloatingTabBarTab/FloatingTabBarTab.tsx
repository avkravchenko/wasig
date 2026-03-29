import { Pressable, StyleSheet, Text, View } from "react-native";
import type { ComponentType } from "react";

type TabIconProps = {
  color?: string;
  width?: number;
  height?: number;
};

type FloatingTabBarTabProps = {
  isFocused: boolean;
  label: string;
  onPress: () => void;
  onLongPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
  badgeCount?: number;
  Icon?: ComponentType<TabIconProps>;
  iconOffsetX?: number;
};

const FloatingTabBarTab = ({
  isFocused,
  label,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
  badgeCount,
  Icon,
  iconOffsetX = 0,
}: FloatingTabBarTabProps) => {
  const shouldShowBadge = typeof badgeCount === "number" && badgeCount > 0;
  const iconColor = isFocused ? "#34394A" : "#B8BFCC";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.tabButton, isFocused && styles.tabButtonActive]}
    >
      <View style={styles.content}>
        {Icon ? (
          <View style={styles.iconSlot}>
            <View
              style={
                iconOffsetX
                  ? { transform: [{ translateX: iconOffsetX }] }
                  : undefined
              }
            >
              <Icon width={24} height={24} color={iconColor} />
            </View>
            {shouldShowBadge && !isFocused ? (
              <View style={[styles.badge, styles.badgeCompact]}>
                <Text style={styles.badgeText}>{badgeCount}</Text>
              </View>
            ) : null}
          </View>
        ) : null}
        {isFocused ? (
          <Text style={styles.tabLabel} numberOfLines={1}>
            {label}
          </Text>
        ) : null}
        {shouldShowBadge && isFocused ? (
          <View style={[styles.badge, styles.badgeExpanded]}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        ) : null}
      </View>
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
    backgroundColor: "#F4F3F6",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconSlot: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
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
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#34394A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  badgeCompact: {
    position: "absolute",
    top: -6,
    right: -10,
  },
  badgeExpanded: {
    marginLeft: 8,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "700",
  },
});

export default FloatingTabBarTab;
