import { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  useWindowDimensions,
} from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { type FeedItem } from "../../model/types";
import {
  getFeedAvailabilityLabel,
  getFeedDurationLabel,
  getFeedTimeOfDayLabel,
} from "../../lib/formatters";
import { Button } from "@/shared/ui";

type CardDetailsProps = {
  cardData: FeedItem | null;
  isVisible: boolean;
  onClose: () => void;
};

const CardDetails = ({ cardData, isVisible, onClose }: CardDetailsProps) => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  if (!cardData) {
    return null;
  }

  console.log(cardData);

  const topOffset = insets.top + 12;
  const sheetMaxHeight = Math.max(height - topOffset, 320);
  const availabilityLabel = getFeedAvailabilityLabel(cardData.whenAvailable);
  const distanceLabel =
    typeof cardData.distanceKm === "number"
      ? `${cardData.distanceKm} км от вас`
      : "Рядом с вами";
  const timeOfDayLabel = getFeedTimeOfDayLabel(cardData.timeOfDay);
  const infoItems = [
    {
      label: "Формат",
      value: cardData.activityTypeLabel || cardData.activityType,
    },
    {
      label: "Когда удобно",
      value: [availabilityLabel, timeOfDayLabel].filter(Boolean).join(", "),
    },
    {
      label: "Длительность",
      value: getFeedDurationLabel(cardData.duration),
    },
    {
      label: "Город",
      value: cardData.cityName,
    },
  ].filter((item) => item.value);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      swipeThreshold={80}
      style={styles.modal}
      backdropOpacity={0.24}
      propagateSwipe
      useNativeDriverForBackdrop
      avoidKeyboard
      scrollTo={(params) => scrollViewRef.current?.scrollTo(params)}
      scrollOffset={scrollOffset}
      scrollOffsetMax={sheetMaxHeight}
    >
      <View
        style={[
          styles.sheetShell,
          {
            marginTop: topOffset,
            height: sheetMaxHeight,
          },
        ]}
      >
        <View style={styles.topBar}>
          <View style={styles.grabber} />
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingBottom: 24 }]}
          showsVerticalScrollIndicator={false}
          bounces
          nestedScrollEnabled
          scrollEventThrottle={16}
          onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
            setScrollOffset(event.nativeEvent.contentOffset.y);
          }}
        >
          <View style={styles.metaRow}>
            <Text style={styles.metaBadge}>{availabilityLabel}</Text>
            <Text style={styles.metaDistance}>{distanceLabel}</Text>
          </View>

          <View style={styles.heroBlock}>
            <Text style={styles.title}>{cardData.activityTitle}</Text>
            <Text style={styles.subtitle}>
              {cardData.userName}, {cardData.userAge}
            </Text>
            <Text style={styles.description}>
              {cardData.activityDescription}
            </Text>
          </View>

          {cardData.isVerified ? (
            <View style={styles.statusCard}>
              <Text style={styles.statusText}>Профиль подтвержден</Text>
            </View>
          ) : null}

          {cardData.interests.length > 0 ? (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Интересы</Text>
              <View style={styles.chipsWrap}>
                {cardData.interests.map((interest) => (
                  <View key={interest.id} style={styles.chip}>
                    <Text style={styles.chipText}>{interest.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>О встрече</Text>
            <View style={styles.detailsGrid}>
              {infoItems.map((item) => (
                <View key={item.label} style={styles.detailCard}>
                  <Text style={styles.detailLabel}>{item.label}</Text>
                  <Text style={styles.detailValue}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
          <View style={styles.footerProfile}>
            <Text style={styles.footerName}>{cardData.userName},</Text>
            <Text style={styles.footerAge}>{cardData.userAge}</Text>
          </View>
          <Button
            type="secondary"
            size="lg"
            fullWidth
            title="написать"
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  sheetShell: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    overflow: "hidden",
  },
  topBar: {
    paddingTop: 10,
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  grabber: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#D7DCE2",
  },
  scroll: {
    flex: 1,
    minHeight: 0,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 18,
  },
  metaBadge: {
    backgroundColor: "#F0F2F6",
    color: "#767C8B",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  metaDistance: {
    color: "#73798A",
    fontSize: 13,
    fontWeight: "700",
  },
  heroBlock: {
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3A3F50",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#5A6473",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#474D5D",
    textAlign: "center",
  },
  statusCard: {
    marginBottom: 28,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#EEF6EC",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#41644A",
    textAlign: "center",
  },
  infoSection: {
    gap: 12,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#696E7E",
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#E8ECF2",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4B5160",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  detailCard: {
    width: "48%",
    backgroundColor: "#F2F4F7",
    borderRadius: 18,
    padding: 18,
    gap: 10,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#696E7E",
  },
  detailValue: {
    fontSize: 15,
    lineHeight: 22,
    color: "#3E4454",
  },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingHorizontal: 18,
    gap: 16,
  },
  footerProfile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  footerAge: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default CardDetails;
