import { View } from "react-native";
import { Text } from "react-native";
import useCommunicationStyle from "../model/hooks/useCommunicationStyle";
import { RadioGroup, Button } from "@/shared/ui";
import { StyleSheet } from "react-native";
import { MARGIN_BOTTOM } from "@/shared/constants";
import commonStyles from "@/shared/styles";

const UserCommunicationStyle = ({onNextStep}: {onNextStep: () => void}) => {
    const { 
        communicationStyle,
        communicationStyleList, 
        handleCommunicationStyleChange, 
        submitCommunicationStyle 
    } = useCommunicationStyle({onNextStep});
    return (
        <View style={styles.container}>
            <View>
                <Text style={commonStyles.titleText}>Какой у тебя стиль общения?</Text>
                <RadioGroup
                    options={communicationStyleList}
                    onChange={handleCommunicationStyleChange}
                />
            </View>
         
            <View style={styles.buttonContainer}>
                <Button
                    disabled={!communicationStyle}
                    title="Далее"
                    size="lg"
                    onPress={submitCommunicationStyle}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    buttonContainer: {
        marginBottom: MARGIN_BOTTOM,
        alignItems: "center",
    }
})

export default UserCommunicationStyle