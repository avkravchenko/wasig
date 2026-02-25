import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ImagePlaceholder } from "@/shared/ui";

const CardCover = ({ imageUrl }: { imageUrl: string | null }) => {
  const [isImageError, setIsImageError] = useState(false);
  const hasImage = typeof imageUrl === "string" && imageUrl.length > 0;
  const shouldShowImage = hasImage && !isImageError;

  return (
    <View style={styles.container}>
      {shouldShowImage ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
          onError={() => setIsImageError(true)}
        />
      ) : (
        <ImagePlaceholder title="Нет фото" style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: "#E5E7EB",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    borderRadius: 32,
  },
});

export default CardCover;
