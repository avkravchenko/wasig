import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import InputsChain from "@/shared/ui/InputsChain";
import commonStyles from "@/shared/styles";
import Button from "@/shared/ui/Button";
import { useEffect, useState } from "react";
import { VERTICAL_OFFSET, MARGIN_BOTTOM } from "@/shared/constants";
import useCode from "../model/hooks/useCode";

const AuthWithPhoneStepTwo = () => {
  const { code, isCodeFilled, isCodeConfirmed, handleCodeChange } = useCode();
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
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
              value={code}
              isCodeConfirmed={isCodeConfirmed}
              isCodeFilled={isCodeFilled}
              placeholder="-"
              placeholderPlacement="center"
              keyBoardType="numeric"
              onPress={() => {}}
              onChange={handleCodeChange}
            />
          </View>
          <Button
            disabled={seconds > 0 || !isCodeFilled}
            title={`Повторно отправить код ${seconds > 0 ? `через ${seconds}` : ""}`}
            size="lg"
            onPress={() => {}}
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
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: MARGIN_BOTTOM,
  },
});

export default AuthWithPhoneStepTwo;
