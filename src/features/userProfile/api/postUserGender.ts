import { privateApi } from "@/shared/api/privateApi";

const postUserGender = async (sex: string) => {
    return await privateApi.post('/api/v1/onboarding/gender', { gender: sex });
}

export default postUserGender;