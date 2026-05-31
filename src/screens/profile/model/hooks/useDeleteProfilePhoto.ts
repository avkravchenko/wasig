import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfilePhoto } from "../../api/deleteProfilePhoto";
import {
  applyProfilePhotoPositions,
  getProfilePhotos,
} from "../lib/profilePhotos";
import type { MyProfile } from "../types";
import { MY_PROFILE_QUERY_KEY } from "./useMyProfile";

const useDeleteProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (photoId: string) => deleteProfilePhoto(photoId),
    onSuccess: async (_, photoId) => {
      queryClient.setQueryData<MyProfile>(MY_PROFILE_QUERY_KEY, (profile) => {
        if (!profile) {
          return profile;
        }

        const photos = getProfilePhotos(profile.photos).filter(
          (photo) => photo.id !== photoId,
        );
        const hasMainPhoto = photos.some((photo) => photo.isMain);
        const nextPhotos = hasMainPhoto
          ? photos
          : photos.map((photo, index) => ({
              ...photo,
              isMain: index === 0,
            }));

        return {
          ...profile,
          photos: applyProfilePhotoPositions(nextPhotos),
        };
      });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: MY_PROFILE_QUERY_KEY }),
        queryClient.invalidateQueries({ queryKey: ["feed"] }),
      ]);
    },
  });
};

export default useDeleteProfilePhoto;
