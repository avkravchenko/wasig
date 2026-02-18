import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_LABELS: Record<string, string> = {
  "feed-tab": "Лента",
  "meetings-tab": "Встречи",
  "profile-tab": "Профиль",
};

const FloatingTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarHost, { paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.tabBarOuter}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const label =
            TAB_LABELS[route.name] ??
            (typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : typeof options.title === "string"
                ? options.title
                : route.name);

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
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
              {route.name === "meetings-tab" ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>4</Text>
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarHost: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 0,
  },
  tabBarOuter: {
    backgroundColor: "#F0F2F5",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tabButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  tabButtonActive: {
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

export default FloatingTabBar;
