import { privateApi } from "@/shared/api/privateApi";

export const postUserGender = async (sex: string) => {
    return await privateApi.post('/api/v1/onboarding/gender', { gender: sex });
}