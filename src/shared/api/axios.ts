import axios from "axios";
import { API_URL } from "../constants/apiConstants";

export const baseAxios = axios.create({
  baseURL: API_URL,
});
