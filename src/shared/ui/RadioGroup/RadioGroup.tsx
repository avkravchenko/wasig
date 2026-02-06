import { FlatList } from "react-native";
import RadioItem from "../RadioItem/RadioItem";

type RadioGroupProps<T extends { label: string, value: any, selected: boolean }> = {
    options: T[];
    onChange: (value: T) => void;
}

const RadioGroup = <T extends { label: string, value: any, selected: boolean }>({ options, onChange }: RadioGroupProps<T>) => {

    return (
        <FlatList
            data={options}
            renderItem={({item}) => (
                <RadioItem 
                    label={item.label} 
                    selected={item.selected} 
                    onPress={() => onChange(item)} 
                />
            )}
        />
    )
}

export default RadioGroup