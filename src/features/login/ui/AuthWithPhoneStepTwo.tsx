import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import InputsChain from "@/shared/ui/InputsChain";
import commonStyles from "@/shared/styles";
import Button from "@/shared/ui/Button";
import { VERTICAL_OFFSET, MARGIN_BOTTOM } from "@/shared/constants";
import useCode from "../model/hooks/useCode";
import useTimer from "@/shared/lib/useTimer";

interface AuthWithPhoneStepTwoProps {
  phoneNumber: string;
  onResendCode: () => void;
}

const AuthWithPhoneStepTwo = ({
  phoneNumber,
  onResendCode,
}: AuthWithPhoneStepTwoProps) => {
  const { seconds, resetTimer } = useTimer(60);

  const {
    code,
    isCodeLoading,
    isCodeConfirmed,
    isCodeError,
    handleCodeSubmit,
  } = useCode(phoneNumber);

  const handleResendPress = () => {
    resetTimer();
    onResendCode();
  };

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
              value={code}
              isCodeConfirmed={isCodeConfirmed}
              isCodeError={isCodeError}
              placeholder="-"
              placeholderPlacement="center"
              keyBoardType="number-pad"
              onCodeFilled={handleCodeSubmit}
            />
          </View>
          <Button
            disabled={seconds > 0}
            title={`Повторно отправить код ${
              seconds > 0 ? `через ${seconds}` : ""
            }`}
            size="lg"
            onPress={handleResendPress}
          />
        </View>
      </ScrollView>
      <Modal
        transparent
        presentationStyle="overFullScreen"
        visible={isCodeLoading}
      >
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
