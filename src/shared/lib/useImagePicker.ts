import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const useImagePicker = (mediaTypes: ImagePicker.MediaType[]) => {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: mediaTypes,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    return {
        image,
        pickImage,
    }
}

export default useImagePicker