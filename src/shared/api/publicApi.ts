import { baseAxios } from "./axios";
import { setupPublicInterceptors } from "./interceptors";

export const publicApi = baseAxios.create();

setupPublicInterceptors(publicApi);
