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

const VERTICAL_OFFSET = 110;

const AuthWithPhoneStepOne = ({ nextStep }: { nextStep: () => void }) => {
  const {
    phoneNumber,
    isPhoneNumberValid,
    handlePhoneNumberChange,
    handlePhoneNumberPress,
  } = useDefinePhoneNumber();

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
          <Text style={styles.title}>Вход по номеру телефона</Text>
          <TextField
            ref={inputRef}
            placeholder="Номер телефона"
            keyBoardType="numeric"
            onChange={handlePhoneNumberChange}
            onPress={() => {}}
            value={phoneNumber}
          />
          <Text>{isPhoneNumberValid ? "Valid" : "Invalid"}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>
            Нажимая кнопку “Отправить код”, вы принимаете пользовательское
            соглашение и политику конфиндециальности
          </Text>
          <Button
            disabled={!isPhoneNumberValid || !phoneNumber}
            title="Отправить код"
            size="lg"
            onPress={handlePhoneNumberPress}
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
    marginBottom: 25,
  },
  text: {
    textAlign: "center",
    marginBottom: 16,
  },
});

export default AuthWithPhoneStepOne;
