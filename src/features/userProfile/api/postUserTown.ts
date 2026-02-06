import { privateApi } from "@/shared/api/privateApi";

export const postUserTown = async (townId: number) => {
    return await privateApi.post('/api/v1/onboarding/city', { cityId: townId });
}   