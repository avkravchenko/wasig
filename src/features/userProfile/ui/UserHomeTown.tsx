import commonStyles from "@/shared/styles";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";

import TextField from "@/shared/ui/TextField";
import RadioItem from "@/shared/ui/RadioItem";
import Button from "@/shared/ui/Button";

import { useDebounce } from "@/shared/lib";
import { getTowns } from "@/features/userProfile/api";
import { Town } from "@/features/userProfile/model/types";
import { VERTICAL_OFFSET, MARGIN_BOTTOM } from "@/shared/constants";

const UserHomeTown = ({
  onNextStep,
}: {
  onNextStep: () => void;
  onPrevStep: () => void;
}) => {
  const [homeTown, setHomeTown] = useState("");
  const [towns, setTowns] = useState<Town[]>([]);
  const [selectedTown, setSelectedTown] = useState<Town | null>(null);

  const debouncedHomeTown = useDebounce(homeTown, 500);

  const handleSelectTown = (town: Town) => {
    setSelectedTown((prev) => (prev?.id === town.id ? null : town));
  };

  useEffect(() => {
    const fetchTowns = async () => {
      const result = await getTowns(debouncedHomeTown);
      if (result.status === 200) {
        setTowns(result.data);
      }
    };

    fetchTowns();
  }, [debouncedHomeTown]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? VERTICAL_OFFSET : 0}
    >
      <View style={styles.screen}>
        <Text style={commonStyles.titleText}>В каком ты городе?</Text>

        <Text style={commonStyles.hintText}>
          Для некоторых пользователей это может быть значимо{" "}
          {selectedTown?.name}
        </Text>

        <View style={styles.inputWrapper}>
          <TextField
            value={homeTown}
            onChange={setHomeTown}
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

export default UserHomeTown;
