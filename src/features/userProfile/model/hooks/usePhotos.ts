import { useState } from "react";

const usePhotos = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [photos, setPhotos] = useState<string[]>([]);

    const selectPhotos = () => {
        
    }
    
    const submitPhotos = () => {
        
    }
    
    return {
        loading,
        photos,
        selectPhotos,
        submitPhotos,
    }
}

export default usePhotos