import { StyleSheet, Text, View } from "react-native";
import { ChatItem } from "../../model/types";

type ChatAvatarProps = {
  kind: ChatItem["avatarKind"];
};

export const ChatAvatar = ({ kind }: ChatAvatarProps) => {
  if (kind === "photo") {
    return (
      <View style={[styles.avatar, styles.avatarPhoto]}>
        <Text style={styles.avatarPhotoText}>A</Text>
      </View>
    );
  }

  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarLetter}>A</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#E1E5ED",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarLetter: {
    color: "#B8BED2",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "700",
  },
  avatarPhoto: {
    backgroundColor: "#1C2B34",
  },
  avatarPhotoText: {
    color: "#F2F3F6",
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "700",
  },
});
