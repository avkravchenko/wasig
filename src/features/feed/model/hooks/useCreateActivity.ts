import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActivity } from "../../api/createActivity";
import { CreateActivityRequest } from "../types/activity";

const useCreateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateActivityRequest) => createActivity(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
};

export default useCreateActivity;
