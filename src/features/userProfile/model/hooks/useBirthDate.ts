import { useState } from "react";
import { postUserBirthdDate } from "../../api/postUserBirthdDate";
import useFocus from "@/shared/lib/useFocus";
import { format, parse } from "date-fns";

const useBirthDate = (onNextStep: () => void) => {
    const [date, setDate] = useState<string>("");
    const inputRef = useFocus();

    const handleDateChange = (text: string) => {
        setDate(text);
    };

    const submitBirthDate = async () => {
        if (!date) {
            return;
        }

        try {
            const parsedDate = parse(date, 'dd.MM.yyyy', new Date());
            const requestDate = format(parsedDate, 'yyyy-MM-dd');

            await postUserBirthdDate(requestDate);
            onNextStep();
        } catch (error) {
            console.log(error);
        }
    }

    return {
        inputRef,
        date,
        handleDateChange,
        submitBirthDate,
    }
}

export default useBirthDate;