import { Text, View } from "react-native";
import useMeetingGoals from "../model/hooks/useMeetingGoals";
import { Button, RadioGroup } from "@/shared/ui";
import { StyleSheet } from "react-native";
import commonStyles from "@/shared/styles";
import { MARGIN_BOTTOM } from "@/shared/constants";

const UserMeetingGoal = ({ onNextStep }: { onNextStep: () => void }) => {
    const { 
        meetingGoal, 
        meetingGoalsList, 
        handleMeetingGoalChange, 
        submitUserMeetingGoal 
    } = useMeetingGoals({onNextStep});
    return (    
        <View style={styles.container}>
            <View>
                <Text style={commonStyles.titleText}>Цель встречи</Text>
                <RadioGroup
                    options={meetingGoalsList}
                    onChange={handleMeetingGoalChange}
                />
            </View>
            
            <View style={styles.buttonContainer}>
                <Button
                    disabled={!meetingGoal}
                    title="Далее"
                    size="lg"
                    onPress={submitUserMeetingGoal}
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

export default UserMeetingGoal