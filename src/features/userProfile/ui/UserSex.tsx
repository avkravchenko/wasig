import {
  Text,
  View,
} from "react-native";
import commonStyles from "@/shared/styles";
import Button from "@/shared/ui/Button";
import { MARGIN_BOTTOM } from "@/shared/constants";
import { StyleSheet } from "react-native";
import RadioItem from "@/shared/ui/RadioItem";
import useGender from "../model/hooks/useGender";

const UserSex = ({ onNextStep }: { onNextStep: () => void }) => {
  const { genders, handleGenderSelect, submitGender } = useGender(onNextStep);

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}
    >
      <View style={styles.inputContainer}>
        <Text numberOfLines={2} style={commonStyles.titleText}>
          Укажи свой пол
        </Text>
        <Text style={styles.hintText}>
          Для некоторых пользователей это может быть значимо
        </Text>

        <RadioItem
          key={`gender-${genders[0].sex}`}
          label={genders[0].label}
          selected={genders[0].selected}
          onPress={() => handleGenderSelect(genders[0].sex)}
        />
        <RadioItem
          key={`gender-${genders[1].sex}`}
          label={genders[1].label}
          selected={genders[1].selected}
          onPress={() => handleGenderSelect(genders[1].sex)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          disabled={!genders.some((item) => item.selected)}
          title="Далее"
          size="lg"
          onPress={submitGender}
        />
      </View>
    </View>
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
