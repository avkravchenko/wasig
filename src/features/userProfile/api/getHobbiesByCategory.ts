import { privateApi } from "@/shared/api/privateApi";

export const getHobbiesByCategory = async (signal?: AbortSignal) => {
    return await privateApi.get('/api/v1/onboarding/interests/categories', {
        signal,
    });
}