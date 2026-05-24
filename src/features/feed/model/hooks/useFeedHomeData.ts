import { getApiErrorMessage } from "@/shared/api/errors";
import { useCurrentLocation } from "@/shared/lib";
import useFeed from "./useFeed";
import useMyActivities from "./useMyActivities";
import { useFeedModeStore } from "../store";

const useFeedHomeData = () => {
  const { latitude, longitude } = useCurrentLocation();
  const feedMode = useFeedModeStore((state) => state.mode);
  const feed = useFeed({ latitude, longitude });
  const isMyActivitiesMode = feedMode === "myActivities";
  const myActivities = useMyActivities({ enabled: isMyActivitiesMode });
  const activeFeed = isMyActivitiesMode ? myActivities : feed;

  return {
    data: activeFeed.data,
    emptyTitle: isMyActivitiesMode
      ? "У вас пока нет активностей"
      : "Карточки пока не найдены",
    errorDescription: getApiErrorMessage(activeFeed.error),
    errorTitle: isMyActivitiesMode
      ? "Не удалось загрузить мои активности"
      : "Не удалось загрузить ленту",
    feedMode,
    isError: activeFeed.isError,
    isLoading: activeFeed.isLoading,
    refetch: activeFeed.refetch,
    refreshingText: isMyActivitiesMode
      ? "Обновляем активности"
      : "Обновляем ленту",
  };
};

export default useFeedHomeData;
