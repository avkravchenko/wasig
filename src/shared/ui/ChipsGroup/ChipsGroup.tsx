
import { FlatList, Text, View } from "react-native";
import Chip from "../Chip/Chip";

interface Hobby {
    id: number;
    name: string;
    category: string;
    isCustom: boolean;
}

const ChipsGroup = ({
    groupTitle,
    selectedItems,
    handleSelect,
    items,
}: {
    groupTitle: string;
    selectedItems: {id: number, selected: boolean}[];
    handleSelect: (item: {id: number, selected: boolean}) => void;
    items: {id: number, name: string}[];
}) => {

    return (
        <View>
            <Text>{groupTitle}</Text>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <Chip
                        title={item.name}
                        selected={selectedItems.some((chip) => chip.id === item.id)}
                        onPress={() => {
                            handleSelect(item);
                        }}  
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

export default ChipsGroup;