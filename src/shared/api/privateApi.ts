import { baseAxios } from "./axios";
import { setupInterceptors } from "./interceptors";

export const privateApi = baseAxios.create();

setupInterceptors(privateApi);
