import { useFocus } from "@/shared/lib";
import { useState } from "react";

const useExpectations = () => {
    const [expectations, setExpectations] = useState<string>('');
    const inputRef = useFocus();

    const handleExpectationsChange = (text: string) => {
        setExpectations(text);
    };
    
    return {
        expectations,
        inputRef,
        handleExpectationsChange,
    };
};

export default useExpectations;