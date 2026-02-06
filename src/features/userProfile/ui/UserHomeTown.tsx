import commonStyles from "@/shared/styles";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import TextField from "@/shared/ui/TextField";
import RadioItem from "@/shared/ui/RadioItem";
import Button from "@/shared/ui/Button";
import { VERTICAL_OFFSET, MARGIN_BOTTOM } from "@/shared/constants";
import useTown from "@/features/userProfile/model/hooks/useTown";

const UserHomeTown = ({
  onNextStep,
}: {
  onNextStep: () => void;
}) => {
  const { searchHomeTown, towns, selectedTown, handleSelectTown, setSearchHomeTown, submitUserHomeTown } =
    useTown(onNextStep);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? VERTICAL_OFFSET : 0}
    >
      <View style={styles.screen}>
        <Text style={commonStyles.titleText}>В каком ты городе?</Text>

        <Text style={commonStyles.hintText}>
          Для некоторых пользователей это может быть значимо
        </Text>

        <View style={styles.inputWrapper}>
          <TextField
            value={searchHomeTown}
            onChange={setSearchHomeTown}
            placeholder="Город"
          />
        </View>

        <FlatList
          data={towns}
          renderItem={({ item }) => (
            <RadioItem
              label={item.name}
              selected={selectedTown?.id === item.id}
              onPress={() => handleSelectTown(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          style={{ flex: 1 }}
        />

        <View style={styles.buttonContainer}>
          <Button
            disabled={!selectedTown}
            title="Далее"
            size="lg"
            onPress={submitUserHomeTown}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  inputWrapper: {
    marginTop: 16,
  },

  buttonContainer: {
    alignItems: "center",
    marginBottom: MARGIN_BOTTOM,
    marginTop: 16,
  },
});

export default UserHomeTown;
