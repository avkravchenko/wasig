import { baseAxios } from "./axios";
import { setupPrivateInterceptors } from "./interceptors";
import { publicApi } from "./publicApi";

export const privateApi = baseAxios.create();

setupPrivateInterceptors(privateApi, publicApi);
