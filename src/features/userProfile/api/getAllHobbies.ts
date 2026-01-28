import { privateApi } from "@/shared/api/privateApi";

const getAllHobbies = async (query: string) => {
  console.log(query);
  
  return await privateApi.get('/api/v1/onboarding/interests', {
    params: { query },
  });
};

export default getAllHobbies;
