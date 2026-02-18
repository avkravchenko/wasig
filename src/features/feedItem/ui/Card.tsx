import { StyleSheet, View } from "react-native";
import CardCover from "./CardCover";
import CardBody from "./CardBody";
import { FeedItem } from "@/entities/feed";
import CardHeader from "./CardHeader";

const Card = ({ cardData }: { cardData: FeedItem }) => {
  return (
    <View style={styles.container}>
      <CardHeader
        mainPhotoThumbnailUrl={cardData.mainPhotoThumbnailUrl}
        activityType={cardData.activityType}
        activityTypeLabel={cardData.activityTypeLabel}
      />
      <View style={styles.cardContent}>
        <CardCover imageUrl={cardData.mainPhotoUrl} />
        <CardBody
          userName={cardData.userName}
          userAge={cardData.userAge}
          userGender={cardData.userGender}
          activityTitle={cardData.activityTitle}
          activityDescription={cardData.activityDescription}
          interests={cardData.interests}
          duration={cardData.duration}
          distanceKm={cardData.distanceKm}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
    alignItems: "stretch",
  },
  cardContent: {
    width: "100%",
    alignItems: "stretch",
  },
});

export default Card;
