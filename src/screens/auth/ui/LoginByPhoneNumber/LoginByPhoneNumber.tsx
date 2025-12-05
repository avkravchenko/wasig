import { useEffect, useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Keyboard,
} from "react-native";
import TextField from "@/shared/ui/TextField/TextField";
import Button from "@/shared/ui/Button/Button";
import Apple from "@/../assets/icons/apple_icon.svg";
import Google from "@/../assets/icons/google_icon.svg";
import Vk from "@/../assets/icons/vk_icon.svg";

const LoginByPhoneNumber = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow,
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleKeyboardShow = () => {
    setIsKeyboardVisible(true);
  };

  const handleKeyboardHide = () => {
    setIsKeyboardVisible(false);
  };

  const conditionalHintText = isKeyboardVisible ? (
    <Text style={styles.socialLoginText}>
      Нажимая кнопку “Отправить код”, вы принимаете пользовательское соглашение
      и политику конфиндециальности
    </Text>
  ) : (
    <Text style={styles.socialLoginText}>Или войти с помощью</Text>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.content,
            isKeyboardVisible
              ? { justifyContent: "flex-start", gap: 75 }
              : { justifyContent: "flex-end" },
          ]}
        >
          <View>
            <Text style={styles.title}>Вход по номеру телефона</Text>
            <View style={styles.inputContainer}>
              <TextField
                placeholder="Номер телефона"
                keyBoardType="numeric"
                onChange={() => {}}
                value=""
              />
            </View>
          </View>

          <View style={styles.socialLoginContainer}>
            {conditionalHintText}
            {isKeyboardVisible ? (
              <View>
                <Button
                  size="lg"
                  type="primary"
                  title="Отправить код"
                  padding={{ x: 20, y: 16 }}
                  onPress={() => {}}
                ></Button>
              </View>
            ) : (
              <View style={styles.socialButtons}>
                <Button size="sm" padding={{ x: 20, y: 16 }} onPress={() => {}}>
                  <Google width={16} height={16} />
                </Button>
                <Button size="sm" padding={{ x: 20, y: 16 }} onPress={() => {}}>
                  <Apple width={24} height={24} />
                </Button>
                <Button size="sm" padding={{ x: 20, y: 16 }} onPress={() => {}}>
                  <Vk width={24} height={24} />
                </Button>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  centeredText: {
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 89,
  },
  socialLoginContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  socialLoginText: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
});

export default LoginByPhoneNumber;
