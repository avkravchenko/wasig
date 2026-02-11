import { useState } from "react";
import { postUserName } from "../../api/postUserName";
import { useMutation } from "@tanstack/react-query";

const useName = (onNextStep: () => void) => {
    const [name, setName] = useState<string>("");
    const { mutate: mutateName, isPending } = useMutation({
        mutationFn: (name: string) => postUserName(name),
        onSuccess: () => {
            onNextStep();
        },
        onError: (error) => {
            console.log(error);
        },
    });


    const submitName = () => {
        if (name.length < 2) return;
        mutateName(name);
    }

    return {
        name,
        isPending,
        setName,
        submitName,
    }
}

export default useName;