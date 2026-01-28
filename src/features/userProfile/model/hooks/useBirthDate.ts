import { useState } from "react";
import postUserBirthdDate from "../../api/postUserBirthdDate";
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

        const parsedDate = parse(date, 'dd.MM.yyyy', new Date());
        const requestDate = format(parsedDate, 'yyyy-MM-dd');

        const result = await postUserBirthdDate(requestDate);

        if (result.status === 200) {
            onNextStep();
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