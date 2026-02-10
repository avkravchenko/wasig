import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Button } from "@/shared/ui";
import commonStyles from "@/shared/styles";
import { MARGIN_BOTTOM } from "@/shared/constants";
import usePhotos from "@/features/userProfile/model/hooks/usePhotos";

const UserPhotos = ({ onNextStep }: { onNextStep: () => void }) => {
    const { selectPhotos, photos, removePhoto } = usePhotos();

    return (
        <View style={styles.container}>
            <View>
                <Text style={commonStyles.titleText}>Добавь несколько фото</Text>
                <View style={styles.photosContainer}>
                    <TouchableOpacity style={styles.photoPlaceholder} onPress={selectPhotos}>
                        <Text style={styles.plusText}>+</Text>
                    </TouchableOpacity> 
                    {photos.map((photoUri, index) => (
                        <View key={index} style={styles.photoWrapper}>
                            <Image source={{ uri: photoUri }} style={styles.photo} />
                            <TouchableOpacity 
                                style={styles.removeButton} 
                                onPress={() => removePhoto(photoUri)}
                            >
                                <Text style={styles.removePhotoText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
     
            </View>
            
            <View style={styles.buttonContainer}>
                <Button onPress={onNextStep} size="lg" title="Далее"/>
            </View>
        </View>
    )
}


// 1m

// /review @working changes

// I'll review the working changes to identify potential bugs and code improvements. Let me analyze the code changes systematically.

// Code Review Findings
// Critical Issues
// 1. Race Condition in usePhotos Hook
// File: src/features/userProfile/model/hooks/usePhotos.ts Lines: 25-29

// The useEffect that adds new photos creates a potential race condition:

// typescript
// useEffect(() => {
//     if (image) {
//         setPhotos(prevPhotos => new Set([...prevPhotos, image]));
//     }
// }, [image]);
// Issue: If pickImage() is called multiple times quickly, the image state in useImagePicker gets overwritten, but the effect might add the wrong image to photos.

// 2. Incomplete submitPhotos Implementation
// File: src/features/userProfile/model/hooks/usePhotos.ts Lines: 15-17

// typescript
// const submitPhotos = () => {
//     setLoading(true);
// }
// Issue: Sets loading to true but never resets it to false, leaving the UI in a permanent loading state.

// 3. Missing Error Handling in Image Picker
// File: src/shared/lib/useImagePicker.ts Lines: 7-18

// No error handling for permission denials or picker failures. The function silently fails if permissions are denied.

// 4. Array Index as React Key
// File: src/features/userProfile/ui/UserPhotos.tsx Line: 19

// typescript
// {photos.map((photoUri, index) => (
//     <View key={index} style={styles.photoWrapper}>
// Issue: Using array index as key causes React reconciliation issues when photos are removed/reordered.

// Medium Issues
// 5. Hardcoded Layout Width
// File: src/features/userProfile/ui/UserPhotos.tsx Line: 51

// typescript
// width: (163 * 2) + 16,
// Issue: Hardcoded width assumes exactly 2 columns, breaking responsiveness.

// 6. Unused Document Picker Hook
// File: src/shared/lib/useDocumentPicker.ts

// The entire hook is added but never used in the current implementation.

// 7. Missing Loading State UI
// File: src/features/userProfile/ui/UserPhotos.tsx

// The component doesn't handle the loading state from usePhotos hook.

// Minor Issues
// 8. Inconsistent Type Usage
// File: src/shared/lib/useImagePicker.ts Line: 4

// typescript
// const useImagePicker = (mediaTypes: ImagePicker.MediaType[]) => {
// Issue: Should use the correct enum ImagePicker.MediaTypeOptions instead of MediaType[].

// 9. Missing Null Check in removePhoto
// File: src/features/userProfile/model/hooks/usePhotos.ts Lines: 19-23

// The null check is redundant since the parameter type is string, not string | null.

// Recommendations
// Fix race condition by using a callback pattern or ref to ensure the correct image is added
// Complete submitPhotos implementation with proper loading state management
// Add error boundaries and permission handling for image picker
// Use photo URI as React key instead of array index
// Make layout responsive by removing hardcoded width
// Remove unused code (document picker hook) or implement it properly
// Add loading UI to provide user feedback during operations
// Fix type definitions to match Expo ImagePicker API
// The most critical issues are the race condition in photo selection and the incomplete submit function that leaves the app in a loading state.

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center", 
        justifyContent: "space-between",
    },
    photosContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start", 
        gap: 16,
        width: (163 * 2) + 16, 
        marginTop: 20,
        marginBottom: 40, 
    },
    photoPlaceholder: {
        position: "relative",
        width: 163,
        height: 163,
        borderRadius: 8,
        backgroundColor: "#F3F5F7",
        justifyContent: "center",
        alignItems: "center",
    },
    plusText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#9CA3AF",
    },
    photo: {
        width: 163,
        height: 163,
        borderRadius: 8,
    },
    photoWrapper: {
        position: "relative",
        width: 163,
        height: 163,
    },
    removeButton: {
        position: "absolute",
        top: 5,
        right: 5,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: MARGIN_BOTTOM,
    },
    removePhotoText: {
        color: "#FFFFFF",
        transform: [{ rotate: "45deg" }],
    },
});


export default UserPhotos