import { StyleSheet, Text, View } from "react-native";
import NotificationsIcon from "../../../../../assets/icons/notifications-alt-fill.svg";
import { ImagePlaceholder } from "@/shared/ui";

export const ChatsHeader = () => {
  return (
    <View style={styles.topRow}>
      <View style={styles.topContentContainer}>
        <ImagePlaceholder compact style={styles.topAvatar} />
        <View style={styles.topTextContainer}>
          <Text style={styles.statusLabel}>Мой статус</Text>
          <Text style={styles.statusEmoji}>:)</Text>
        </View>
      </View>

      <View style={styles.notificationsPill}>
        <NotificationsIcon width={24} height={24} color="#34394A" />
        <Text style={styles.notificationsBadgeText}>99+</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  topContentContainer: {
    flex: 1,
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
    marginRight: 10,
  },
  topAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  topTextContainer: {
    marginLeft: 12,
    flexShrink: 1,
    minWidth: 0,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusLabel: {
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    fontWeight: "600",
    color: "#3B3D4B",
  },
  statusEmoji: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    backgroundColor: "#D1DDC5",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: "#30323E",
  },
  notificationsPill: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    flexShrink: 0,
    alignSelf: "flex-start",
  },
  notificationsBadgeText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    backgroundColor: "#30323E",
    borderRadius: 32,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: "#FFFFFF",
  },
});
