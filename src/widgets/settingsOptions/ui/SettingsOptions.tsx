import { Pressable, StyleSheet, Text, View } from "react-native";
import type { SettingsOption } from "../model/types";

const SETTINGS_OPTIONS: SettingsOption[] = [
  { title: "Подключить аккаунт" },
  { title: "Настройки уведомления" },
  { title: "Инфо" },
  { title: "Личные данные", description: "Требует верификации" },
  { title: "Поддержка" },
  { title: "Черный список (?)" },
  { title: "Удалить аккаунт" },
];

const SettingsOptions = () => {
  return (
    <View style={styles.options}>
      {SETTINGS_OPTIONS.map((option) => (
        <Pressable
          key={option.title}
          style={styles.option}
          accessibilityRole="button"
        >
          <Text style={styles.optionTitle} numberOfLines={1}>
            {option.title}
          </Text>
          <View style={styles.optionMeta}>
            {option.description ? (
              <Text style={styles.optionDescription} numberOfLines={1}>
                {option.description}
              </Text>
            ) : null}
            <Text style={styles.optionChevron}>›</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  options: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    overflow: "hidden",
    paddingVertical: 2,
  },
  option: {
    minHeight: 53,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 14,
  },
  optionTitle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    color: "#33343D",
  },
  optionMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 18,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#9294A3",
  },
  optionChevron: {
    width: 14,
    fontSize: 36,
    lineHeight: 36,
    fontWeight: "300",
    color: "#20222B",
    textAlign: "right",
    marginTop: -1,
  },
});

export default SettingsOptions;
