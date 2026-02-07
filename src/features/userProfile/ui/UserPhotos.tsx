import { View, StyleSheet } from "react-native";

const UserPhotos = () => {
    return (
        <View style={styles.photosContainer}>
            <View style={styles.photo}></View>
            <View style={styles.photo}></View>
            <View style={styles.photo}></View>   
        </View>
    )
}

const styles = StyleSheet.create({
    photosContainer: {
        flexDirection: "row",
        gap: 8,
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: "#E0E0E0",
    },
})

export default UserPhotos