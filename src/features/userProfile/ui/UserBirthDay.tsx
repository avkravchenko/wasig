import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import commonStyles from "@/shared/styles";
import { VERTICAL_OFFSET, MARGIN_BOTTOM } from "@/shared/constants";
import Button from "@/shared/ui/Button";
import { sharedMasks } from "@/shared/masks";
import useBirthDate from "../model/hooks/useBirthDate";
import ControlledTextField from "@/shared/ui/ControlledTextField/ControlledTextField";

type UserBirthDayProps = {
  onNextStep: () => void;
};

const UserBirthDay = ({ onNextStep }: UserBirthDayProps) => {
  const { control, isValid, isLoading, submitBirthDate, handleSubmit } =
    useBirthDate({ onNextStep });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? VERTICAL_OFFSET : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputContainer}>
          <Text numberOfLines={2} style={commonStyles.titleText}>
            Укажи дату рождения
          </Text>
          <Text style={styles.hintText}>
            Для некоторых пользователей это может быть значимо
          </Text>
          <ControlledTextField
            control={control}
            name="birthday"
            mask={sharedMasks.date}
            placeholder="дд.мм.гггг"
            keyboardType="numeric"
            autoFocus
            renderError={(msg) => (
              <Text style={styles.customError}>⚠ {msg}</Text>
            )}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            disabled={!isValid || isLoading}
            title={isLoading ? "Сохранение..." : "Далее"}
            size="lg"
            onPress={handleSubmit(submitBirthDate)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: MARGIN_BOTTOM,
  },
  hintText: {
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "thin",
    fontSize: 14,
  },
  customError: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 16,
  },
});

export default UserBirthDay;
