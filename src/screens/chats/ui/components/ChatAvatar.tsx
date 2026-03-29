import { StyleSheet, Text, View } from "react-native";
import { ChatItem } from "../../model/types";

type ChatAvatarProps = {
  kind: ChatItem["avatarKind"];
  label: string;
  size?: number;
};

export const ChatAvatar = ({ kind, label, size = 62 }: ChatAvatarProps) => {
  const avatarSizeStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  } as const;

  if (kind === "photo") {
    return (
      <View style={[styles.avatar, avatarSizeStyle, styles.avatarPhoto]}>
        <Text style={[styles.avatarPhotoText, { fontSize: size * 0.35, lineHeight: size * 0.42 }]}>
          {label}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.avatar, avatarSizeStyle]}>
      <Text style={[styles.avatarLetter, { fontSize: size * 0.55, lineHeight: size * 0.64 }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#E1E5ED",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarLetter: {
    color: "#B8BED2",
    fontWeight: "700",
  },
  avatarPhoto: {
    backgroundColor: "#1C2B34",
  },
  avatarPhotoText: {
    color: "#F2F3F6",
    fontWeight: "700",
  },
});
