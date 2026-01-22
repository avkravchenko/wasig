import axios from "axios";
import { API_URL } from "@/shared/constants/apiConstants";

const postPhone = async (phoneNumber: string) => {
  console.log(API_URL, phoneNumber);

  return await axios.post(`${API_URL}/api/v1/auth/send-code`, {
    phoneNumber,
  });
};

export default postPhone;
