import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderProfilePhotos } from "../../api/reorderProfilePhotos";
import { reorderProfilePhotoList } from "../lib/profilePhotos";
import type { MyProfile } from "../types";
import { MY_PROFILE_QUERY_KEY } from "./useMyProfile";

type ReorderContext = {
  previousProfile?: MyProfile;
};

const useReorderProfilePhotos = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string[], ReorderContext>({
    mutationFn: (photoIds) => reorderProfilePhotos(photoIds),
    onMutate: async (photoIds) => {
      await queryClient.cancelQueries({ queryKey: MY_PROFILE_QUERY_KEY });

      const previousProfile =
        queryClient.getQueryData<MyProfile>(MY_PROFILE_QUERY_KEY);

      queryClient.setQueryData<MyProfile>(MY_PROFILE_QUERY_KEY, (profile) => {
        if (!profile) {
          return profile;
        }

        return {
          ...profile,
          photos: reorderProfilePhotoList(profile.photos, photoIds),
        };
      });

      return { previousProfile };
    },
    onError: (_, __, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(MY_PROFILE_QUERY_KEY, context.previousProfile);
      }
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: MY_PROFILE_QUERY_KEY }),
        queryClient.invalidateQueries({ queryKey: ["feed"] }),
      ]);
    },
  });
};

export default useReorderProfilePhotos;
