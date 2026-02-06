import { privateApi } from "@/shared/api/privateApi";
import { CommunicationStyle } from "../model/types";

export const postUserCommunicationStyle = async (communicationStyle: CommunicationStyle) => {
    return await privateApi.post("/api/v1/onboarding/communication-style", { communicationStyle });
}   