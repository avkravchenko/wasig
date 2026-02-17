import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

import AuthWithApp from "./AuthWithApp";
import TextField from "@/shared/ui/TextField";

const LoginEntryPoint = ({
  selectAuthWay,
}: {
  selectAuthWay: (way: "phone" | "app") => void;
}) => {
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
        <View style={[styles.content]}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Вход по номеру телефона</Text>
            <TextField
              size="lg"
              value={""}
              onChange={() => {}}
              onPress={() => selectAuthWay("phone")}
              placeholder="Номер телефона"
            />
          </View>
          <Text style={styles.socialLoginText}>Или войти с помощью</Text>
          <View style={styles.socialLoginContainer}>
            <AuthWithApp />
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
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
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
  socialLoginText: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
  },
  socialLoginContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});

export default LoginEntryPoint;
