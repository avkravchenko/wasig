import commonStyles from "@/shared/styles";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import TextField from "@/shared/ui/TextField";
import Button from "@/shared/ui/Button";
import { VERTICAL_OFFSET, MARGIN_BOTTOM } from "@/shared/constants";
import useHobbies from "@/features/userProfile/model/hooks/useHobbies";
import ChipsGroup from "@/shared/ui/ChipsGroup";
import useModal from "@/shared/lib/useModal";
import { Chip } from "@/shared/ui";

const UserHobbies = ({ onNextStep }: { onNextStep: () => void }) => {
  const { visible, setVisible } = useModal();
  const {
    hobbiesAndCategories,
    search,
    selectedHobbies,
    selectedCustomHobbies,
    customHobbyInput,
    customHobbyToDisplay,
    addCustomHobby,
    selectCustomHobby,
    setSearch,
    setSelectedHobbies,
    setCustomHobbyInput,
    submitInterests,
  } = useHobbies(setVisible, onNextStep);


  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? VERTICAL_OFFSET : 0}
      >
        <View style={styles.screen}>
          <Text style={commonStyles.titleText}>Чем ты интересуешься?</Text>
          <Text style={commonStyles.hintText}>Не более 3х</Text>
          <View style={styles.inputWrapper}>
            <TextField
              value={search}
              onChange={setSearch}
              placeholder="Поиск"
            />
          </View>

          <FlatList
            data={hobbiesAndCategories}
            keyExtractor={(item) => item.category}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 16 }}
            ListEmptyComponent={<Text>No hobbies found</Text>}
            renderItem={({ item, index }) => {
                return (
                  <>
                    <ChipsGroup
                      value={selectedHobbies}
                      items={item.interests}
                      groupTitle={item.category}
                      getId={(item) => item.id}
                      getLabel={(item) => item.name}
                      onChange={setSelectedHobbies}
                    />

                    {index === hobbiesAndCategories.length - 1 &&  
                      <View> 
                        <Text>Свои интересы</Text>
                        <View style={styles.addCustomWrapper}>
                          <FlatList 
                          data={customHobbyToDisplay}
                          renderItem={({ item }) => 
                            (
                              <Chip 
                                title={item.name} 
                                selected={selectedCustomHobbies.has(item.id)}
                                onPress={() => selectCustomHobby(item)}
                              />
                            ) 
                          }
                          keyExtractor={(item) => String(item.id)}
                          style={{ flexDirection: "row", flexWrap: "wrap" }}
                        />
                        <Chip
                          title="Добавить свой интерес"
                          selected={false}
                          onPress={() => setVisible(true)}
                        />
                        </View>
                      </View>
                    }
                  </>
                )
            }}
          />

          <View style={styles.buttonContainer}>
            <Button
              disabled={
                (selectedHobbies.size === 0 && selectedCustomHobbies.size === 0) || 
                (selectedHobbies.size + selectedCustomHobbies.size > 3)
              }
              title="Далее"
              size="lg"
              onPress={submitInterests}
            />
          </View> 
        </View>
      </KeyboardAvoidingView>

      <Modal
        isVisible={visible}
        swipeDirection="down"
        swipeThreshold={100}
        onSwipeComplete={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        style={styles.modal}
        avoidKeyboard={true}
        propagateSwipe
      >
          <View style={styles.modalContent}>
            <View style={styles.swipeIndicator} />

            <Text style={[commonStyles.titleText, { textAlign: "center" }]}>
              Добавить свой интерес
            </Text>

            <View style={styles.modalForm}>
              <TextField
                value={customHobbyInput}
                onChange={setCustomHobbyInput}
                placeholder="Интерес"
              />

              <Button
                title="Добавить"
                size="lg"
                type="secondary"
                onPress={addCustomHobby}
              />
            </View>
          </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },

  inputWrapper: {
    alignItems: "center",
    marginTop: 16,
    width: "100%",
  },

  buttonContainer: {
    alignItems: "center",
    marginBottom: MARGIN_BOTTOM,
    marginTop: 16,
  },

  addCustomWrapper: {
    marginTop: 8,
    gap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    paddingBottom: 32,
    minHeight: 250,
  },

  swipeIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },

  modalForm: {
    marginTop: 20,
    alignItems: "center",
    gap: 16,
  },
});

export default UserHobbies;
