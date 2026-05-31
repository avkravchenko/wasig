import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setMainProfilePhoto } from "../../api/setMainProfilePhoto";
import {
  normalizeProfilePhoto,
  setMainProfilePhotoInList,
} from "../lib/profilePhotos";
import type { MyProfile, UserProfilePhoto } from "../types";
import { MY_PROFILE_QUERY_KEY } from "./useMyProfile";

type SetMainContext = {
  previousProfile?: MyProfile;
};

const useSetMainProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation<UserProfilePhoto, Error, string, SetMainContext>({
    mutationFn: (photoId: string) => setMainProfilePhoto(photoId),
    onMutate: async (photoId): Promise<SetMainContext> => {
      await queryClient.cancelQueries({ queryKey: MY_PROFILE_QUERY_KEY });

      const previousProfile =
        queryClient.getQueryData<MyProfile>(MY_PROFILE_QUERY_KEY);

      queryClient.setQueryData<MyProfile>(MY_PROFILE_QUERY_KEY, (profile) => {
        if (!profile) {
          return profile;
        }

        return {
          ...profile,
          photos: setMainProfilePhotoInList(profile.photos, photoId),
        };
      });

      return { previousProfile };
    },
    onError: (_, __, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(MY_PROFILE_QUERY_KEY, context.previousProfile);
      }
    },
    onSuccess: (photo) => {
      const normalizedPhoto = normalizeProfilePhoto(photo);

      if (!normalizedPhoto) {
        return;
      }

      queryClient.setQueryData<MyProfile>(MY_PROFILE_QUERY_KEY, (profile) => {
        if (!profile) {
          return profile;
        }

        return {
          ...profile,
          photos: setMainProfilePhotoInList(
            profile.photos,
            normalizedPhoto.id,
          ).map((profilePhoto) =>
            profilePhoto.id === normalizedPhoto.id
              ? { ...profilePhoto, ...normalizedPhoto }
              : profilePhoto,
          ),
        };
      });
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: MY_PROFILE_QUERY_KEY }),
        queryClient.invalidateQueries({ queryKey: ["feed"] }),
      ]);
    },
  });
};

export default useSetMainProfilePhoto;
