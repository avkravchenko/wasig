import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import commonStyles from "@/shared/styles";
import { VERTICAL_OFFSET } from "@/shared/constants";
import TextField from "@/shared/ui/TextField/TextField";
import Button from "@/shared/ui/Button";
import { MARGIN_BOTTOM } from "@/shared/constants";
import { useEffect, useState } from "react";
import useFocus from "@/shared/lib/useFocus";
import { StyleSheet } from "react-native";
import useAccessToken from "@/shared/lib/useAccessToken";

const UserName = ({ onNextStep }: { onNextStep: () => void }) => {
  const [name, setName] = useState("");
  const { inputRef } = useFocus();

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const { handleGetAccessToken } = useAccessToken();

  const heh = async () => {
    const accessToken = await handleGetAccessToken();
    console.log(accessToken);
    console.log("sdfsdf");
  };

  useEffect(() => {
    heh();
  }, [name]);

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
            Привет, давай немного познакомимся
          </Text>
          <TextField
            ref={inputRef}
            isValid={true}
            placeholder="Твое имя"
            keyBoardType="default"
            onChange={handleNameChange}
            onPress={() => {}}
            value={name}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            disabled={name.length < 2}
            title="Далее"
            size="lg"
            onPress={onNextStep}
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
  titleWidth: {
    width: "70%",
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
    maxWidth: 300,
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

export default UserName;
