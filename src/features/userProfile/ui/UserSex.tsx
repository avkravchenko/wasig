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
import { useState } from "react";
import useFocus from "@/shared/lib/useFocus";
import { StyleSheet } from "react-native";

const UserSex = ({
  onNextStep,
  onPrevStep,
}: {
  onNextStep: () => void;
  onPrevStep: () => void;
}) => {
  const [sex, setSex] = useState("");
  const { inputRef } = useFocus();

  const handleSexChange = (text: string) => {
    setSex(text);
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
          <Text numberOfLines={2} style={commonStyles.titleText}>
            Укажи дату рождения
          </Text>
          <Text style={styles.hintText}>
            Для некоторых пользователей это может быть значимо
          </Text>
          {/* TODO radio buttons */}
          {/* <TextField
            ref={inputRef}
            isValid={true}
            placeholder="дд.мм.гггг"
            keyBoardType="default"
            onChange={handleDateChange}
            onPress={() => {}}
            value={date}
          /> */}
        </View>
        <View style={styles.buttonContainer}>
          {/* TODO add validation */}
          <Button
            disabled={sex.length < 2}
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
  hintText: {
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "thin",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 16,
  },
});

export default UserSex;
