import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TextField from "@/shared/ui/TextField";
import Button from "@/shared/ui/Button";
import useDefinePhoneNumber from "../model/hooks/useDefinePhoneNumber";
import useFocus from "@/shared/lib/useFocus";
import commonStyles from "@/shared/styles";
import { VERTICAL_OFFSET, MARGIN_BOTTOM } from "@/shared/constants";

const AuthWithPhoneStepOne = ({ nextStep }: { nextStep: () => void }) => {
  const { phoneNumber, isPhoneNumberValid, handlePhoneNumberChange } =
    useDefinePhoneNumber();

  const { inputRef } = useFocus();

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
          <Text style={commonStyles.titleText}>Вход по номеру телефона</Text>
          <TextField
            ref={inputRef}
            isValid={isPhoneNumberValid}
            placeholder="Номер телефона"
            keyBoardType="numeric"
            onChange={handlePhoneNumberChange}
            onPress={() => {}}
            value={phoneNumber}
          />
          {phoneNumber.length > 0 ? (
            <Text style={styles.errorText}>
              {isPhoneNumberValid ? "" : "Неправильно набран номер"}
            </Text>
          ) : null}
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>
            Нажимая кнопку “Отправить код”, вы принимаете пользовательское
            соглашение и политику конфиндециальности
          </Text>
          <Button
            disabled={!isPhoneNumberValid || phoneNumber.length < 11}
            title="Отправить код"
            size="lg"
            onPress={nextStep}
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
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
  text: {
    textAlign: "center",
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 16,
  },
});

export default AuthWithPhoneStepOne;
