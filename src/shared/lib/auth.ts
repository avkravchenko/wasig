import AsyncStorage from "@react-native-async-storage/async-storage";

export const setAccessToken = async (accessToken: string) => {
  await AsyncStorage.setItem("accessToken", accessToken);
};

export const getAccessToken = async () => {
  return await AsyncStorage.getItem("accessToken");
};

export const clearAccessToken = async () => {
  await AsyncStorage.removeItem("accessToken");
};
