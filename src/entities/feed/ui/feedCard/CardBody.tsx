import { View, Text, StyleSheet } from "react-native";
import type { FeedItem } from "../../model/types";
import { getFeedDurationLabel } from "../../lib/formatters";
import CardBodyHobbies from "./CardBodyHobbies";
import { Button } from "@/shared/ui";

type CardBodyProps = Pick<
  FeedItem,
  | "userName"
  | "userAge"
  | "userGender"
  | "activityTitle"
  | "activityDescription"
  | "interests"
  | "duration"
  | "distanceKm"
> & {
  onDetailsPress: () => void;
};
const EMPTY_INTERESTS: NonNullable<CardBodyProps["interests"]> = [];

const CardBody = ({
  userName,
  userAge,
  userGender,
  activityTitle,
  activityDescription,
  interests = EMPTY_INTERESTS,
  duration,
  distanceKm,
  onDetailsPress,
}: CardBodyProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.durationDistanceContainer}>
        <Text style={styles.durationText}>{getFeedDurationLabel(duration)}</Text>
        <Text style={styles.distanceText}>
          {typeof distanceKm === "number"
            ? `${distanceKm} км от вас`
            : "Расстояние неизвестно"}
        </Text>
      </View>

      <View style={styles.activityContainer}>
        <Text
          style={styles.activityTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {activityTitle}
        </Text>
        <Text
          style={styles.activityDescription}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {activityDescription}
        </Text>
        <CardBodyHobbies interests={interests} />
      </View>
      <View style={styles.userContainer}>
        <Text style={styles.userName}>{userName},</Text>
        <Text style={styles.userAge}>{userAge}</Text>
        <Text style={styles.onlineIndicator}>Недавно</Text>
      </View>
      <Button
        type="secondary"
        size="lg"
        fullWidth
        title="Подробнее"
        onPress={onDetailsPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    minHeight: 248,
    gap: 16,
    padding: 16,
    borderRadius: 32,
    marginTop: -82,
    zIndex: 1,
    justifyContent: "space-between",
  },
  durationDistanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "center",
  },
  durationText: {
    backgroundColor: "#F3F5F7",
    color: "#7E8191",
    fontSize: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 16,
    fontWeight: "bold",
  },
  distanceText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "bold",
  },
  activityContainer: {
    width: "100%",
    alignItems: "center",
    gap: 8,
    minHeight: 112,
  },

  activityTitle: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
  activityDescription: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    color: "#3B3D4B",
    minHeight: 40,
    width: "100%",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userAge: {
    fontSize: 16,
    fontWeight: "bold",
  },
  onlineIndicator: {
    fontSize: 10,
    marginHorizontal: 6,
    padding: 8,
    borderRadius: 16,
    fontWeight: "bold",
    color: "#C88629",
    backgroundColor: "#FBF6E4",
  },
});

export default CardBody;
