import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  MEETING_REQUESTS,
  type MeetingRequest,
} from "@/entities/meeting";
import type { NavigationProp } from "@/app/router/types";
import { ROUTER_NAME_SPACES } from "@/app/router";
import CloseIcon from "../../../../assets/icons/material-symbols_close-rounded.svg";

const MeetingsScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          {
            paddingBottom: insets.bottom + 120,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <Text style={styles.headerTitle}>Запросы</Text>
          <Pressable hitSlop={12} style={styles.closeButton}>
            <CloseIcon width={28} height={28} color="#111111" />
          </Pressable>
        </View>

        <View style={styles.cards}>
          {MEETING_REQUESTS.map((request) => (
            <MeetingRequestCard key={request.id} request={request} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const MeetingRequestCard = ({ request }: { request: MeetingRequest }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate(ROUTER_NAME_SPACES.MEETING_REQUEST.NAME, {
          requestId: request.id,
        })
      }
    >
      <View style={styles.cardTopRow}>
        <View style={styles.profileRow}>
          <Image source={{ uri: request.photoUrl }} style={styles.avatar} />
          <View style={styles.profileMeta}>
            <View style={styles.nameRow}>
              <Text style={styles.nameText}>
                {request.name}, {request.age}
              </Text>
              <VerifiedBadge />
              {request.isOnline ? (
                <View style={styles.onlineBadge}>
                  <Text style={styles.onlineText}>Онлайн</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        <Pressable hitSlop={10} style={styles.moreButton}>
          <Text style={styles.moreIcon}>...</Text>
        </Pressable>
      </View>

      <Text style={styles.cardTitle}>{request.title}</Text>
      <Text style={styles.cardDescription}>{request.description}</Text>

      <View style={styles.actionsRow}>
        <Pressable style={[styles.actionButton, styles.primaryAction]}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.primaryActionText}>
            Сказать &quot;привет&quot;
          </Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.secondaryAction]}>
          <Text style={styles.secondaryActionText}>Отклонить</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const VerifiedBadge = () => {
  return (
    <View style={styles.verifiedBadge}>
      <Text style={styles.verifiedIcon}>✓</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ECECF8",
  },
  header: {
    minHeight: 88,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    paddingHorizontal: 28,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700",
    color: "#111111",
  },
  closeButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  cards: {
    paddingHorizontal: 16,
    gap: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 34,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#7E7E81",
    marginRight: 12,
  },
  profileMeta: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  nameText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: "#37374E",
  },
  verifiedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4D4D56",
    alignItems: "center",
    justifyContent: "center",
  },
  verifiedIcon: {
    fontSize: 11,
    lineHeight: 12,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  onlineBadge: {
    borderRadius: 999,
    backgroundColor: "#E6EEDB",
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  onlineText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "#8D9686",
  },
  moreButton: {
    minWidth: 28,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 2,
  },
  moreIcon: {
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.8,
    color: "#111111",
    fontWeight: "700",
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#37374E",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 15,
    lineHeight: 21,
    color: "#3E4055",
    marginBottom: 22,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  primaryAction: {
    backgroundColor: "#EEF0FA",
  },
  secondaryAction: {
    backgroundColor: "#EEF0FA",
  },
  primaryActionText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: "#37374E",
    flexShrink: 1,
  },
  secondaryActionText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: "#37374E",
  },
});

export default MeetingsScreen;
