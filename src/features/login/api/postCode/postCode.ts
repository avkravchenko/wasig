import axios from "axios";
import { API_URL } from "@/shared/constants/apiConstants";

export const postCode = async (body: { phoneNumber: string; code: string }) => {
  return await axios.post(`${API_URL}/api/v1/auth/verify-code`, body);
};
