import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProfilePhoto } from "../../api/addProfilePhoto";
import type { AddProfilePhotoParams } from "../../api/addProfilePhoto";
import {
  applyProfilePhotoPositions,
  getProfilePhotos,
  normalizeProfilePhoto,
  setMainProfilePhotoInList,
} from "../lib/profilePhotos";
import type { MyProfile, UserProfilePhoto } from "../types";
import { MY_PROFILE_QUERY_KEY } from "./useMyProfile";

const useAddProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation<UserProfilePhoto, Error, AddProfilePhotoParams>({
    mutationFn: (params: AddProfilePhotoParams) => addProfilePhoto(params),
    onSuccess: async (photo) => {
      const normalizedPhoto = normalizeProfilePhoto(photo);

      if (normalizedPhoto) {
        queryClient.setQueryData<MyProfile>(MY_PROFILE_QUERY_KEY, (profile) => {
          if (!profile) {
            return profile;
          }

          const photos = getProfilePhotos(profile.photos).filter(
            (profilePhoto) => profilePhoto.id !== normalizedPhoto.id,
          );

          const nextPhotos = [...photos, normalizedPhoto];

          return {
            ...profile,
            photos: applyProfilePhotoPositions(
              normalizedPhoto.isMain
                ? setMainProfilePhotoInList(nextPhotos, normalizedPhoto.id)
                : nextPhotos,
            ),
          };
        });
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: MY_PROFILE_QUERY_KEY }),
        queryClient.invalidateQueries({ queryKey: ["feed"] }),
      ]);
    },
  });
};

export default useAddProfilePhoto;
