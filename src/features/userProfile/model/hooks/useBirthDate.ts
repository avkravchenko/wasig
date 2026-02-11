import { postUserBirthdDate } from "../../api/postUserBirthdDate";
import { format, parse } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { birthdayStringSchema } from "../schema/birthDaySchema";
import { useForm, Control, UseFormHandleSubmit } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({ birthday: birthdayStringSchema });
type FormData = z.infer<typeof formSchema>;

type UseBirthDateProps = {
  onNextStep: () => void;
};

type UseBirthDateReturn = {
  control: Control<FormData>;
  isValid: boolean;
  isLoading: boolean;
  submitBirthDate: (data: FormData) => void;
  handleSubmit: UseFormHandleSubmit<FormData>;
};

const useBirthDate = ({ onNextStep }: UseBirthDateProps): UseBirthDateReturn => {
  const { control, handleSubmit, formState: { isValid } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", 
    defaultValues: { birthday: "" }
  });

  const { mutate: submitBirthDateMutation, isPending: isLoading } = useMutation({
    mutationFn: async (data: FormData): Promise<void> => {
      const requestDate = format(data.birthday, 'yyyy-MM-dd');
      
      await postUserBirthdDate(requestDate);
    },
    onSuccess: () => {
      onNextStep();
    },
    onError: (error) => {
      console.error('Failed to submit birth date:', error);
    },
  });

  const submitBirthDate = (data: FormData): void => {
    submitBirthDateMutation(data);
  };

  return {
    control,
    isValid,
    isLoading,
    submitBirthDate,
    handleSubmit,
  };
};

export default useBirthDate;