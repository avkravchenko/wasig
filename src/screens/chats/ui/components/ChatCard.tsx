import { StyleSheet, Text, View } from "react-native";
import { ChatItem } from "../../model/types";
import { ChatAvatar } from "./ChatAvatar";

type ChatCardProps = {
  item: ChatItem;
};

export const ChatCard = ({ item }: ChatCardProps) => {
  return (
    <View style={styles.card}>
      <ChatAvatar kind={item.avatarKind} />

      <View style={styles.body}>
        <View style={styles.head}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>
              {item.name}, {item.age}
            </Text>
            {item.isNew ? (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>НОВЫЙ</Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.time}>{item.time}</Text>
        </View>

        <View style={styles.foot}>
          <View style={styles.subtitleRow}>
            {item.isOnline ? <View style={styles.onlineDot} /> : null}
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>

          {item.unreadCount ? (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    backgroundColor: "#F7F7F8",
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },
  name: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: "#34394A",
    flexShrink: 1,
  },
  newBadge: {
    borderRadius: 999,
    backgroundColor: "#E7E8EE",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  newBadgeText: {
    fontSize: 10,
    lineHeight: 10,
    letterSpacing: -0.16,
    color: "#808699",
    fontWeight: "700",
  },
  time: {
    fontSize: 14,
    lineHeight: 18,
    color: "#8A90A3",
    flexShrink: 0,
  },
  foot: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    minWidth: 0,
  },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#A6D67B",
    flexShrink: 0,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    color: "#34394A",
    flexShrink: 1,
  },
  unreadBadge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#3A3D47",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
    flexShrink: 0,
  },
  unreadBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 18,
  },
});
