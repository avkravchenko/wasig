import { privateApi } from "@/shared/api/privateApi";

const postExpectations = async (expectations: string) => {
  const response = await privateApi.post("/user/expectations", { meetingGoal: expectations });
  return response.data;
};

export default postExpectations;