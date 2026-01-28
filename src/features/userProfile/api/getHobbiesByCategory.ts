import { privateApi } from "@/shared/api/privateApi";

const getHobbiesByCategory = async () => {
    return await privateApi.get('/api/v1/onboarding/interests/categories');
}

export default getHobbiesByCategory;