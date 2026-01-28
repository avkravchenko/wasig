import { privateApi } from "@/shared/api/privateApi";

const postUserTown = async (townId: number) => {
    return await privateApi.post('/api/v1/onboarding/city', { cityId: townId });
}   

export default postUserTown;