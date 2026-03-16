import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import type { ComponentType } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FeedIcon from "../../../../assets/icons/broad-activity-feed-20-filled.svg";
import FilterIcon from "../../../../assets/icons/filter.svg";
import MeetingsIcon from "../../../../assets/icons/chat-smile-ai-line.svg";
import ProfileIcon from "../../../../assets/icons/chat-solid.svg";
import FloatingTabBarTab from "./FloatingTabBarTab";

const TAB_LABELS: Record<string, string> = {
  "feed-tab": "Лента",
  "filters-tab": "Фильтры",
  "meetings-tab": "Встречи",
  "profile-tab": "Профиль",
};

type TabRoute = BottomTabBarProps["state"]["routes"][number];
type TabOptions = BottomTabBarProps["descriptors"][string]["options"];
type TabIconComponent = ComponentType<{
  color?: string;
  width?: number;
  height?: number;
}>;

const TAB_ICONS: Record<string, TabIconComponent> = {
  "feed-tab": FeedIcon,
  "filters-tab": FilterIcon,
  "meetings-tab": MeetingsIcon,
  "profile-tab": ProfileIcon,
};

const TAB_ICON_OFFSET_X: Record<string, number> = {
  "feed-tab": 1.5,
};

const SECONDARY_TAB_NAMES = new Set(["filters-tab"]);

const getTabLabel = (route: TabRoute, options: TabOptions) => {
  if (TAB_LABELS[route.name]) {
    return TAB_LABELS[route.name];
  }

  if (typeof options.tabBarLabel === "string") {
    return options.tabBarLabel;
  }

  if (typeof options.title === "string") {
    return options.title;
  }

  return route.name;
};

const getBadgeCount = (routeName: string) => {
  return routeName === "meetings-tab" ? 4 : undefined;
};

const FloatingTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const createOnPress = (route: TabRoute, isFocused: boolean) => () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      navigation.navigate(route.name, route.params);
    }
  };

  const createOnLongPress = (route: TabRoute) => () => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  const tabs = state.routes.map((route, index) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;

    return {
      key: route.key,
      routeName: route.name,
      accessibilityLabel: options.tabBarAccessibilityLabel,
      testID: options.tabBarButtonTestID,
      isFocused,
      label: getTabLabel(route, options),
      onPress: createOnPress(route, isFocused),
      onLongPress: createOnLongPress(route),
      badgeCount: getBadgeCount(route.name),
      Icon: TAB_ICONS[route.name],
      iconOffsetX: TAB_ICON_OFFSET_X[route.name] ?? 0,
    };
  });

  const primaryTabs = tabs.filter(
    (tab) => !SECONDARY_TAB_NAMES.has(tab.routeName),
  );
  const secondaryTabs = tabs.filter((tab) =>
    SECONDARY_TAB_NAMES.has(tab.routeName),
  );

  return (
    <View style={[styles.tabBarHost, { paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.tabBarRow}>
        <View style={[styles.tabBarOuter, styles.primaryTabGroup]}>
          {primaryTabs.map((tab) => (
            <FloatingTabBarTab
              key={tab.key}
              accessibilityLabel={tab.accessibilityLabel}
              testID={tab.testID}
              isFocused={tab.isFocused}
              label={tab.label}
              onPress={tab.onPress}
              onLongPress={tab.onLongPress}
              badgeCount={tab.badgeCount}
              Icon={tab.Icon}
              iconOffsetX={tab.iconOffsetX}
            />
          ))}
        </View>
        <View style={[styles.tabBarOuter, styles.secondaryTabGroup]}>
          {secondaryTabs.map((tab) => (
            <FloatingTabBarTab
              key={tab.key}
              accessibilityLabel={tab.accessibilityLabel}
              testID={tab.testID}
              isFocused={tab.isFocused}
              label={tab.label}
              onPress={tab.onPress}
              onLongPress={tab.onLongPress}
              badgeCount={tab.badgeCount}
              Icon={tab.Icon}
              iconOffsetX={tab.iconOffsetX}
            />
          ))}
        </View>
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
  tabBarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 0,
  },
  tabBarOuter: {
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    shadowColor: "#1B2330",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  primaryTabGroup: {
    flex: 1,
  },
  secondaryTabGroup: {
    justifyContent: "center",
  },
});

export default FloatingTabBar;
