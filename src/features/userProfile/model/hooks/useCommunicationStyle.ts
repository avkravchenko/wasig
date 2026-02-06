import { CommunicationStyle, CommunicationStyleItem } from "../types";
import { useState } from "react";
import { postUserCommunicationStyle } from "@/features/userProfile/api/postUserCommunicationStyle";

const useCommunicationStyle = ({onNextStep}: {onNextStep: () => void}) => {
    const [communicationStyle, setCommunicationStyle] = useState<CommunicationStyle | null>(null);

    const [communicationStyleList, setCommunicationStyleList] = useState<CommunicationStyleItem[]>([
        {
            label: "Больше слушаю",
            value: CommunicationStyle.LISTENER,
            selected: false
        }, {
            label: "Больше говорю",
            value: CommunicationStyle.TALKER,
            selected: false
        }, {
            label: "Баланс",
            value: CommunicationStyle.BALANCED,
            selected: false
        }
    ]);

    const handleCommunicationStyleChange = (style: CommunicationStyleItem) => {
        setCommunicationStyle(style.value);
        setCommunicationStyleList(prev => prev.map(item => item.value === style.value ? {...item, selected: true} : {...item, selected: false}))
    }

    const submitCommunicationStyle = async() => {
        if (!communicationStyle) return;

        try {
            await postUserCommunicationStyle(communicationStyle);
            onNextStep();
        } catch (error) {
            console.log(error);
        }
    }

    return {
        communicationStyle,
        communicationStyleList,
        handleCommunicationStyleChange,
        submitCommunicationStyle,
    }
}

export default useCommunicationStyle