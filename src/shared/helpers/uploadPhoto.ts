interface UploadResponse {
    urls: string[];
}

export const uploadPhotos = async ({ 
    photos, 
    postFunction 
}: {
    photos: string[];
    postFunction: (formData: FormData) => Promise<UploadResponse>;
}): Promise<UploadResponse> => {
    const formData = new FormData();
    
    photos.forEach((photoUri, index) => {        
        const file = {
            uri: photoUri,
            type: 'image/jpeg',
            name: `photo_${index}.jpg`,
        };
        formData.append('file', file as any);
    });

    return await postFunction(formData);
};