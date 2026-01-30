import { FlatList, Text, View } from "react-native";
import Chip from "../Chip/Chip";


interface BaseItem {
    id: string | number;
    name: string;
}

interface ChipsGroupProps<T extends BaseItem> {
    value: T[];
    items: T[];
    groupTitle: string;
    handleSelect: (item: T) => void;
}

const ChipsGroup = <T extends BaseItem>({
    groupTitle,
    value,
    handleSelect,
    items,
}: ChipsGroupProps<T>) => {
    if (!items.length || !groupTitle) return null;

    return (
        <View style={{ marginVertical: 16, gap: 8 }}>
            <Text>{groupTitle}</Text>
            <FlatList
                data={items}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <Chip
                        title={item.name}
                        selected={value.some(v => v.id === item.id)}
                        onPress={() => handleSelect(item)}
                    />
                )}
                style={{ flexDirection: "row", flexWrap: "wrap" }}
            />
        </View>
    );
};

export default ChipsGroup;
