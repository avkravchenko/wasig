import commonStyles from "@/shared/styles";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import TextField from "@/shared/ui/TextField";
import Button from "@/shared/ui/Button";
import { VERTICAL_OFFSET, MARGIN_BOTTOM } from "@/shared/constants";
import useHobbies from "@/features/userProfile/model/hooks/useHobbies";
import ChipsGroup from "@/shared/ui/ChipsGroup";
import useModal from "@/shared/lib/useModal";
import { Chip } from "@/shared/ui";

const UserHobbies = ({ onNextStep }: { onNextStep: () => void }) => {
  const { search, hobbiesAndCategories, selectedHobbies, setSearch, handleSelectHobby, loading, addCustomHobby, customHobbies } = useHobbies() ;
  const { visible, setVisible } = useModal();

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
          renderItem={({ item, index }) => {
            return (
              <View>
                <ChipsGroup 
                  value={selectedHobbies}
                  items={item.interests}
                  groupTitle={item.category} 
                  handleSelect={handleSelectHobby} 
                />
                {/* TODO: finish custom hobbies */}
                {index === hobbiesAndCategories.length - 1 && (<View>
                  <ChipsGroup 
                    value={customHobbies}
                    items={customHobbies}
                    groupTitle="Свои хобби" 
                    handleSelect={handleSelectHobby} 
                  />
                </View>)}
              </View>
            )
          }}

          keyExtractor={(item) => item.category}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
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
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet" // Нативный стиль iOS
        onRequestClose={() => setVisible(false)}
      >
        <View style={{ padding: 20 }}>
          <Text>Контент модального окна</Text>
          <Button title="Закрыть" onPress={() => setVisible(false)} />
        </View>
      </Modal>
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
