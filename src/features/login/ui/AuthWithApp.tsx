import { View, StyleSheet } from "react-native";
import Button from "@/shared/ui/Button/Button";
import Google from "@/../assets/icons/google_icon.svg";
import Apple from "@/../assets/icons/apple_icon.svg";
import Vk from "@/../assets/icons/vk_icon.svg";

const AuthWithApp = () => {
  return (
    <View style={styles.socialButtons}>
      <Button size="sm" padding={{ x: 20, y: 16 }} onPress={() => {}}>
        <Google width={16} height={16} />
      </Button>
      <Button size="sm" padding={{ x: 20, y: 16 }} onPress={() => {}}>
        <Apple width={24} height={24} />
      </Button>
      <Button size="sm" padding={{ x: 20, y: 16 }} onPress={() => {}}>
        <Vk width={24} height={24} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
});

export default AuthWithApp;
