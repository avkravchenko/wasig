import { Pressable, StyleSheet, Text, View } from "react-native";
import PencilIcon from "../../../../assets/icons/pencil.svg";
import ProfileCard from "./ProfileCard";

type ProfileSectionProps = {
  chips?: string[];
  editable?: boolean;
  emptyText?: string;
  onEdit?: () => void;
  title: string;
  value?: string;
};

const ProfileSection = ({
  title,
  value,
  chips,
  emptyText,
  editable = false,
  onEdit,
}: ProfileSectionProps) => {
  return (
    <ProfileCard>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {editable ? (
          <Pressable
            style={styles.editButton}
            hitSlop={10}
            accessibilityRole="button"
            onPress={onEdit}
          >
            <PencilIcon width={14} height={14} color="#3B3D4B" />
          </Pressable>
        ) : null}
      </View>

      {value ? <Text style={styles.sectionValue}>{value}</Text> : null}

      {chips?.length ? (
        <View style={styles.chipsWrap}>
          {chips.map((chip) => (
            <View key={`${title}-${chip}`} style={styles.chip}>
              <Text style={styles.chipText}>{chip}</Text>
            </View>
          ))}
        </View>
      ) : emptyText ? (
        <Text style={styles.sectionValue}>{emptyText}</Text>
      ) : null}
    </ProfileCard>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
    color: "#30323E",
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "#EEF0FA",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionValue: {
    borderRadius: 18,
    backgroundColor: "#EEF0FA",
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    lineHeight: 22,
    color: "#3E4055",
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    backgroundColor: "#EEF0FA",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "600",
    color: "#3B3D4B",
  },
});

export default ProfileSection;
