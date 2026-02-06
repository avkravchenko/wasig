import { useState } from "react";
import { postUserName } from "../../api/postUserName";
import useFocus from "@/shared/lib/useFocus";

const useName = (onNextStep: () => void) => {
    const [name, setName] = useState<string>("");
    const { inputRef } = useFocus();

    const submitName = async () => {
        if (name.length < 2) return;

        try {
            await postUserName(name);
            onNextStep();
        } catch (error) {
            console.log(error);
        }
    }

    return {
        inputRef,
        name,
        setName,
        submitName,
    }
}

export default useName;