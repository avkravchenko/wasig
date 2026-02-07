import { useEffect, useState } from "react";
import useImagePicker from "@/shared/lib/useImagePicker";

const usePhotos = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [photos, setPhotos] = useState<Set<string>>(new Set());


    const { image, pickImage } = useImagePicker(['images']);

    const selectPhotos = () => {
        pickImage();
    }
    
    const submitPhotos = () => {
        setLoading(true);
    }
    
    const removePhoto = (photoUri: string) => {
        if (photoUri) {
            setPhotos(prevPhotos => new Set([...prevPhotos].filter(photo => photo !== photoUri)));
        }
    }

    useEffect(() => {
        if (image) {
            setPhotos(prevPhotos => new Set([...prevPhotos, image]));
        }
    }, [image]);

    return {
        loading,
        photos: Array.from(photos),
        selectPhotos,
        submitPhotos,
        removePhoto,
    }
}

export default usePhotos