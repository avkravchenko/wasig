import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import NotificationsIcon from "../../../../assets/icons/notifications-alt-fill.svg";
import type { FeedItem } from "../model/types";
import { ImagePlaceholder } from "@/shared/ui";

type CardHeaderProps = Pick<
  FeedItem,
  "mainPhotoThumbnailUrl" | "activityType" | "activityTypeLabel"
>;

const CardHeader = ({
  mainPhotoThumbnailUrl,
  activityType,
  activityTypeLabel,
}: CardHeaderProps) => {
  const [isThumbError, setIsThumbError] = useState(false);
  const hasThumbnail =
    typeof mainPhotoThumbnailUrl === "string" &&
    mainPhotoThumbnailUrl.length > 0;
  const shouldShowThumbnail = hasThumbnail && !isThumbError;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {shouldShowThumbnail ? (
          <Image
            source={{ uri: mainPhotoThumbnailUrl }}
            style={styles.image}
            onError={() => setIsThumbError(true)}
          />
        ) : (
          <ImagePlaceholder compact style={styles.placeholder} />
        )}
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.activityTypeLabel}>{activityTypeLabel}</Text>
            <Text style={styles.activityType}>{activityType}</Text>
          </View>
          <Text style={styles.indicator}>9</Text>
        </View>
      </View>
      <View style={styles.anotherIndicatorContainer}>
        <NotificationsIcon width={24} height={24} />
        <Text style={styles.anotherIndicator}>99+</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  placeholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
    borderRadius: 58,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  activityTypeLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7E8191",
  },
  activityType: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3B3D4B",
  },
  indicator: {
    fontSize: 12,
    fontWeight: "500",
    backgroundColor: "#30323E",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    color: "#ffffffff",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  anotherIndicatorContainer: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
    backgroundColor: "#ffffffff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  anotherIndicator: {
    fontSize: 12,
    fontWeight: "500",
    backgroundColor: "#30323E",
    borderRadius: 32,
    padding: 6,
    color: "#ffffffff",
  },
});

export default CardHeader;
