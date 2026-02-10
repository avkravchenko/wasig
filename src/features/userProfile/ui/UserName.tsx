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
import TextField from "@/shared/ui/TextField";
import Button from "@/shared/ui/Button";
import useName from "../model/hooks/useName";

const UserName = ({ onNextStep }: { onNextStep: () => void }) => {
  const { inputRef, name, setName, submitName } = useName(onNextStep);

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
            Привет, давай немного {'\n'} познакомимся
          </Text>
          <TextField
            ref={inputRef}
            placeholder="Твое имя"
            keyBoardType="default"
            onChange={setName}
            onPress={() => {}}
            value={name}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            disabled={name.length < 2}
            title="Далее"
            size="lg"
            onPress={submitName}
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
