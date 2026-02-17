import { View, Text, StyleSheet } from "react-native";
import { Button } from "@/shared/ui";
import commonStyles from "@/shared/styles";
import { MARGIN_BOTTOM } from "@/shared/constants";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/shared/routes/types";
import { ROUTER_NAME_SPACES } from "@/shared/routes/routerNameSpaces";

const UserFinish = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: ROUTER_NAME_SPACES.HOME.NAME }],
            })
          }
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
