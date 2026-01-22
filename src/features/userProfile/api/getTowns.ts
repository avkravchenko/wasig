import axios from "axios";
import { API_URL } from "@/shared/constants/apiConstants";

const getTowns = async (query: string) => {
  return await axios.get(`${API_URL}/api/v1/onboarding/cities`, {
    params: { query },
  });
};

export default getTowns;
