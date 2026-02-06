import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import InputsChain from "@/shared/ui/InputsChain";
import commonStyles from "@/shared/styles";
import Button from "@/shared/ui/Button";
import { useEffect } from "react";
import { VERTICAL_OFFSET, MARGIN_BOTTOM } from "@/shared/constants";

interface AuthWithPhoneStepTwoProps {
  isCodeConfirmed: boolean;
  isLoading: boolean;
  seconds: number;
  handleSecondsChange: (seconds: number) => void;
  handleCodeSubmit: (text: string) => void;
  handleResendCode: () => void;
}

const AuthWithPhoneStepTwo = ({
  isCodeConfirmed,
  isLoading,
  seconds,
  handleSecondsChange,
  handleCodeSubmit,
  handleResendCode,
}: AuthWithPhoneStepTwoProps) => {
  useEffect(() => {
    const timer = setInterval(() => {
      handleSecondsChange(seconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [seconds]);

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
          <View>
            <Text style={commonStyles.titleText}>Введите код из SMS</Text>

            <InputsChain
              isCodeConfirmed={isCodeConfirmed}
              placeholder="-"
              placeholderPlacement="center"
              keyBoardType="number-pad"
              onCodeFilled={handleCodeSubmit}
            />
          </View>
          <Button
            disabled={seconds > 0}
            title={`Повторно отправить код ${seconds > 0 ? `через ${seconds}` : ""}`}
            size="lg"
            onPress={handleResendCode}
          />
        </View>
      </ScrollView>
      <Modal transparent presentationStyle="overFullScreen" visible={isLoading}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="small" color="#fff" />
          <Text style={styles.loadingText}>Вспоминаем, кто вы такой..</Text>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: MARGIN_BOTTOM,
  },
  modalContainer: {
    backgroundColor: "#19191A99",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 16,
  },
  hiddenInput: {
    height: 0,
    opacity: 0,
  },
});

export default AuthWithPhoneStepTwo;
