import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const useImagePicker = (mediaTypes: ImagePicker.MediaType[]) => {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const pickImage = async () => {
        setLoading(true);
        
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: mediaTypes,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        } catch (error) {
            console.error('Error picking image:', error);
        } finally {
            setLoading(false);
        }
    }

    const clearImage = () => {
        setImage(null);
    }

    return {
        image,
        loading,
        pickImage,
        clearImage,
    }
}

export default useImagePicker