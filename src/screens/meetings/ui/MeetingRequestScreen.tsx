import { useMemo } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  getMeetingRequestById,
  type MeetingRequest,
} from "@/entities/meeting";
import {
  MEETING_REQUEST_ROUTE,
  type MeetingRequestRouteParams,
} from "../model/types";

type MeetingRequestScreenProps = NativeStackScreenProps<
  MeetingRequestRouteParams,
  typeof MEETING_REQUEST_ROUTE
>;

const MeetingRequestScreen = ({
  navigation,
  route,
}: MeetingRequestScreenProps) => {
  const insets = useSafeAreaInsets();
  const request = useMemo(
    () => getMeetingRequestById(route.params.requestId),
    [route.params.requestId]
  );

  if (!request) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackTitle}>Заявка не найдена</Text>
        <Pressable style={styles.fallbackButton} onPress={() => navigation.goBack()}>
          <Text style={styles.fallbackButtonText}>Назад</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable
          style={styles.headerIconButton}
          hitSlop={12}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.headerBackIcon}>‹</Text>
        </Pressable>

        <View style={styles.headerMeta}>
          <View style={styles.headerTitleRow}>
            <Text style={styles.headerTitle}>
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

        <Pressable style={styles.headerIconButton} hitSlop={12}>
          <Text style={styles.headerMoreIcon}>•••</Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.content,
          { paddingBottom: 0 },
        ]}
      >
        <View style={styles.card}>
          <View style={styles.coverWrap}>
            <Image source={{ uri: request.photoUrl }} style={styles.heroImage} />
          </View>

          <View style={styles.body}>
            <View style={styles.metaRow}>
              <Pill label={request.periodLabel} />
              <Text style={styles.distanceText}>{request.distanceLabel}</Text>
            </View>

            <View style={styles.contentBlock}>
              <Text style={styles.title}>{request.title}</Text>
              <Text style={styles.description}>{request.description}</Text>
              <View style={styles.tagsRow}>
                {request.tags.map((tag, index) => (
                  <Pill key={`${request.id}-${tag}-${index}`} label={tag} />
                ))}
              </View>
            </View>

            <View style={styles.actionsRow}>
              <Pressable style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Принять</Text>
              </Pressable>
              <Pressable style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Отклонить</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const Pill = ({ label }: { label: string }) => {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillText}>{label}</Text>
    </View>
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
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#ECECF8",
  },
  fallbackTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: "#37374E",
    marginBottom: 16,
  },
  fallbackButton: {
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  fallbackButtonText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: "#37374E",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    marginBottom: 8,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBackIcon: {
    fontSize: 30,
    lineHeight: 30,
    color: "#4A4C59",
    marginTop: -2,
  },
  headerMeta: {
    flex: 1,
    paddingHorizontal: 4,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 22,
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
  headerMoreIcon: {
    fontSize: 18,
    lineHeight: 18,
    color: "#111111",
    fontWeight: "700",
  },
  content: {
    flex: 1,
    paddingTop: 0,
  },
  card: {
    width: "100%",
    flex: 1,
  },
  coverWrap: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: "#D9DEEA",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  body: {
    flex: 1,
    marginTop: -82,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    padding: 16,
    gap: 16,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  contentBlock: {
    width: "100%",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  distanceText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "700",
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#3B3D4B",
    textAlign: "center",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: -4,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#E7EAEF",
    margin: 4,
  },
  pillText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: "#3B3D4B",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: "auto",
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 999,
    backgroundColor: "#F1F3F8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  actionButtonText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
    color: "#37374E",
  },
});

export default MeetingRequestScreen;
