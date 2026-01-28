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
import Button from "@/shared/ui/Button";
import { VERTICAL_OFFSET, MARGIN_BOTTOM } from "@/shared/constants";
import useHobbies from "@/features/userProfile/model/hooks/useHobbies";
import ChipsGroup from "@/shared/ui/ChipsGroup";

const UserHobbies = ({ onNextStep }: { onNextStep: () => void }) => {
  const { search, hobbiesAndCategories, searchedHobbies, selectedHobbies, setSearch, handleSelectHobby } = useHobbies() ;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? VERTICAL_OFFSET : 0}
    >
      <View style={styles.screen}>
        <Text style={commonStyles.titleText}>Чем ты интересуешься?</Text>

        <Text style={commonStyles.hintText}>
          Не более 3х
        </Text>

        <View style={styles.inputWrapper}>
          <TextField
            value={search}
            onChange={setSearch}
            placeholder="Поиск"
          />
        </View>

        <FlatList
          data={hobbiesAndCategories}
          renderItem={({ item }) => (
            <ChipsGroup 
              groupTitle={item.category} 
              selectedItems={selectedHobbies} 
              handleSelect={handleSelectHobby} 
              items={item.interests} 
            />
          )}
          keyExtractor={(item) => item.category}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16, flex: 1, flexDirection: "row", flexWrap: "wrap" }}
          style={{ flex: 1 }}
        />

        <View style={styles.buttonContainer}>
          <Button
            disabled={selectedHobbies.length === 0}
            title="Далее"
            size="lg"
            onPress={onNextStep}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
  },

  inputWrapper: {
    marginTop: 16,
    width: "100%",
  },

  buttonContainer: {
    alignItems: "center",
    marginBottom: MARGIN_BOTTOM,
    marginTop: 16,
  },
});

export default UserHobbies;
