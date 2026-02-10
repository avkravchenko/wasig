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
import { sharedMasks } from "@/shared/masks";
import useBirthDate from "../model/hooks/useBirthDate";

const UserBirthDay = ({
  onNextStep,
}: {
  onNextStep: () => void;
}) => {
const { inputRef, date, handleDateChange, submitBirthDate } = useBirthDate(onNextStep);

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
          <TextField
            ref={inputRef}
            mask={sharedMasks.date}
            placeholder="дд.мм.гггг"
            keyBoardType="numeric"
            onChange={handleDateChange}
            onPress={() => {}}
            value={date}
          />
        </View>
        <View style={styles.buttonContainer}>
          {/* TODO add validation */}
          <Button
            disabled={date.length < 10}
            title="Далее"
            size="lg"
            onPress={submitBirthDate}
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

export default UserBirthDay;
