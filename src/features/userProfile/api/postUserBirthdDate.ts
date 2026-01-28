import { privateApi } from "@/shared/api/privateApi";

const postUserBirthdDate = async (date: string) => {
    return await privateApi.post('/api/v1/onboarding/birth-date', { birthDate:date });
}

export default postUserBirthdDate;