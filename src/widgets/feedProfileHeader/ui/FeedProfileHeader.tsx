import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import NotificationsIcon from "../../../../assets/icons/notifications-alt-fill.svg";
import { ROUTER_NAME_SPACES } from "@/app/router";
import { NavigationProp } from "@/app/router/types";
import useMyActivities from "@/features/feed/model/hooks/useMyActivities";
import { useFeedModeStore } from "@/features/feed/model/store";
import { Button } from "@/shared/ui";

const CREATE_ACTIVITY_HEADER_TITLE = "Создать\nактивность";

type FeedProfileHeaderProps = {
  onCreateActivityPress?: () => void;
};

const FeedProfileHeader = ({
  onCreateActivityPress,
}: FeedProfileHeaderProps) => {
  const navigation = useNavigation<NavigationProp>();
  const mode = useFeedModeStore((state) => state.mode);
  const toggleMode = useFeedModeStore((state) => state.toggleMode);
  const { data } = useMyActivities();
  const firstMyActivity = data[0];
  const activityTitle =
    firstMyActivity?.activityTitle?.trim() ||
    firstMyActivity?.activityDescription?.trim() ||
    CREATE_ACTIVITY_HEADER_TITLE;
  const activityDescription =
    firstMyActivity?.activityTitle?.trim() &&
    firstMyActivity.activityDescription?.trim()
      ? firstMyActivity.activityDescription.trim()
      : null;
  const isActivitiesMode = mode === "myActivities";

  return (
    <View style={styles.container}>
      <View style={styles.profileContent}>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate(ROUTER_NAME_SPACES.MY_PROFILE.NAME)}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>И</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={toggleMode}
          style={[
            styles.textContainer,
            isActivitiesMode ? styles.textContainerActive : null,
          ]}
        >
          <View style={styles.textContent}>
            {activityDescription ? (
              <Text
                style={styles.caption}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {activityDescription}
              </Text>
            ) : null}
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {activityTitle}
            </Text>
          </View>
          <Text style={styles.arrow}>{isActivitiesMode ? "‹" : "›"}</Text>
        </Pressable>
      </View>
      {isActivitiesMode && onCreateActivityPress ? (
        <Button
          type="secondary"
          size="sm"
          title="Создать"
          onPress={onCreateActivityPress}
        />
      ) : (
        <View style={styles.notificationsPill}>
          <NotificationsIcon width={22} height={22} color="#34394A" />
          <Text style={styles.notificationsBadgeText}>99+</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#30323E",
  },
  avatarText: {
    fontSize: 16,
    lineHeight: 18,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 48,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  textContainerActive: {
    backgroundColor: "#EEF4FF",
  },
  textContent: {
    flex: 1,
    paddingRight: 8,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    color: "#7E8191",
    fontWeight: "700",
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    color: "#30323E",
    fontWeight: "700",
  },
  arrow: {
    fontSize: 24,
    lineHeight: 24,
    color: "#30323E",
  },
  notificationsPill: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    minHeight: 48,
    borderRadius: 999,
    flexShrink: 0,
    alignSelf: "center",
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

export default FeedProfileHeader;
