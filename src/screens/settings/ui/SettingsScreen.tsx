import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NavigationProp } from "@/app/router/types";
import { LogoutButton } from "@/features/logout";
import SettingsOptions from "@/widgets/settingsOptions";

type SettingsScreenProps = {
  navigation: NavigationProp;
};

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable
          style={styles.headerButton}
          hitSlop={12}
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.headerBackIcon}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Настройки</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 104 },
        ]}
      >
        <SettingsOptions />
      </ScrollView>

      <View
        style={[
          styles.logoutWrap,
          { paddingBottom: Math.max(insets.bottom, 22) },
        ]}
      >
        <LogoutButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F4F4FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingBottom: 14,
  },
  headerButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBackIcon: {
    fontSize: 27,
    lineHeight: 28,
    color: "#20222B",
    marginTop: -2,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: "#101018",
    paddingLeft: 8,
  },
  content: {
    paddingTop: 16,
  },
  logoutWrap: {
    position: "absolute",
    right: 24,
    bottom: 0,
    left: 24,
    backgroundColor: "#F4F4FA",
    paddingTop: 14,
  },
});

export default SettingsScreen;
