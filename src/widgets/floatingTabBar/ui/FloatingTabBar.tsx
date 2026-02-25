import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FloatingTabBarTab from "./FloatingTabBarTab";

const TAB_LABELS: Record<string, string> = {
  "feed-tab": "Лента",
  "meetings-tab": "Встречи",
  "profile-tab": "Профиль",
};

type TabRoute = BottomTabBarProps["state"]["routes"][number];
type TabOptions = BottomTabBarProps["descriptors"][string]["options"];

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
      accessibilityLabel: options.tabBarAccessibilityLabel,
      testID: options.tabBarButtonTestID,
      isFocused,
      label: getTabLabel(route, options),
      onPress: createOnPress(route, isFocused),
      onLongPress: createOnLongPress(route),
      badgeCount: getBadgeCount(route.name),
    };
  });

  return (
    <View style={[styles.tabBarHost, { paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.tabBarOuter}>
        {tabs.map((tab) => (
          <FloatingTabBarTab
            key={tab.key}
            accessibilityLabel={tab.accessibilityLabel}
            testID={tab.testID}
            isFocused={tab.isFocused}
            label={tab.label}
            onPress={tab.onPress}
            onLongPress={tab.onLongPress}
            badgeCount={tab.badgeCount}
          />
        ))}
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
    justifyContent: "space-between",
    gap: 10,
  },
});

export default FloatingTabBar;
