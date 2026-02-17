import axios from "axios";
import { API_URL } from "../constants/apiConstants";

export const baseAxios = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
