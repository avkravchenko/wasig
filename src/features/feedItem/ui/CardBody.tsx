import { View, Text, StyleSheet } from "react-native";
import { FeedItem } from "@/entities/feed";
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
>;

const CardBody = ({
  userName,
  userAge,
  userGender,
  activityTitle,
  activityDescription,
  interests = [],
  duration,
  distanceKm,
}: CardBodyProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.durationDistanceContainer}>
        <Text style={styles.durationText}>{duration}</Text>
        <Text style={styles.distanceText}>{distanceKm} км от вас</Text>
      </View>

      <View style={styles.activityContainer}>
        <Text style={styles.activityTitle}>{activityTitle}</Text>
        <Text style={styles.activityDescription}>{activityDescription}</Text>
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
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    gap: 16,
    padding: 16,
    borderRadius: 32,
    marginTop: -82,
    zIndex: 1,
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
    marginBottom: 16,
  },

  activityTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  activityDescription: {
    textAlign: "center",
    fontSize: 14,
    color: "#3B3D4B",
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
