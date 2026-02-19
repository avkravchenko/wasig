import { useMutation } from "@tanstack/react-query";
import { postUserInterests } from "../../api/postUserInterests";
import { PostUserInterestsRequest } from "../../api/types";

const useSubmitInterests = (onNextStep: () => void) => {
  const submitInterestsMutation = useMutation({
    mutationFn: (request: PostUserInterestsRequest) => postUserInterests(request),
    onSuccess: () => {
      onNextStep();
    },
    onError: (error) => {
      console.error("Error submitting interests:", error);
    },
  });

  const submitInterests = (request: PostUserInterestsRequest) => {
    submitInterestsMutation.mutate(request);
  };

  return {
    submitInterests,
    isSubmitting: submitInterestsMutation.isPending,
    submitError: submitInterestsMutation.error,
  };
};

export default useSubmitInterests;
