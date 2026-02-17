import { MARGIN_BOTTOM, VERTICAL_OFFSET } from "@/shared/constants";
import commonStyles from "@/shared/styles";
import { Button, TextField } from "@/shared/ui";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useExpectations from "../model/hooks/useExpectations";

const UserExpectations = ({ onNextStep }: { onNextStep: () => void }) => {
  const {
    expectations,
    inputRef,
    handleExpectationsChange,
    submitExpectations,
  } = useExpectations({ onNextStep });

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
            Какие у тебя ожидания от встречи?
          </Text>
          <Text style={styles.hintText}>
            Расскажи о том, чего ты хочешь от этой встречи
          </Text>
          <TextField
            ref={inputRef}
            placeholder="Твои ожидания"
            keyBoardType="default"
            onChange={handleExpectationsChange}
            onPress={() => {}}
            value={expectations}
          />
        </View>
        <View style={styles.buttonContainer}>
          {/* TODO add validation */}
          <Button
            disabled={!expectations}
            title="Далее"
            size="lg"
            onPress={submitExpectations}
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

export default UserExpectations;
