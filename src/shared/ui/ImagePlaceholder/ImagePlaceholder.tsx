import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type ImagePlaceholderProps = {
  title?: string;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

const ImagePlaceholder = ({
  title = "Нет фото",
  compact = false,
  style,
  titleStyle,
}: ImagePlaceholderProps) => {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        pointerEvents="none"
        colors={["rgba(255, 255, 255, 0.28)", "rgba(255, 255, 255, 0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientOverlay}
      />
      <LinearGradient
        pointerEvents="none"
        colors={["rgba(127, 145, 165, 0)", "rgba(127, 145, 165, 0.28)"]}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientOverlay}
      />
      <View style={[styles.iconWrap, compact && styles.iconWrapCompact]}>
        <View style={[styles.iconHead, compact && styles.iconHeadCompact]} />
        <View style={[styles.iconBody, compact && styles.iconBodyCompact]} />
      </View>
      {!compact ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E9EDF3",
    borderWidth: 1,
    borderColor: "#DCE3EC",
    gap: 8,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#D6DEE8",
    alignItems: "center",
    justifyContent: "center",
  },
  iconHead: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#9AA7B6",
    marginBottom: 4,
  },
  iconHeadCompact: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 2,
  },
  iconBody: {
    width: 24,
    height: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#9AA7B6",
  },
  iconBodyCompact: {
    width: 14,
    height: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  iconWrapCompact: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6C7785",
    letterSpacing: 0.2,
  },
});

export default ImagePlaceholder;
