import { privateApi } from "@/shared/api/privateApi";

const postUserName = async (name: string) => {
  const response = await privateApi.post(`/api/v1/onboarding/name`, {
    name,
  });

  console.log(privateApi);

  return response;
};

export default postUserName;
