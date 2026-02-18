import { View, Text, StyleSheet } from "react-native";
import { Button } from "@/shared/ui";
import commonStyles from "@/shared/styles";
import { MARGIN_BOTTOM } from "@/shared/constants";

interface UserFinishProps {
  onGoHome: () => void;
}

const UserFinish = ({ onGoHome }: UserFinishProps) => {

  return (
    <View style={[commonStyles.container, { justifyContent: "flex-end" }]}>
      <View style={styles.container}>
        <Text style={commonStyles.titleText}>Ура!</Text>
        <Text style={commonStyles.hintText}>Ты успешно прошел все шаги</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="На главную"
          type="secondary"
          size="lg"
          onPress={onGoHome}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 32,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: MARGIN_BOTTOM,
  },
});

export default UserFinish;
