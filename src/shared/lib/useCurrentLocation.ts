import { useEffect, useState } from "react";
import * as Location from "expo-location";

interface CurrentLocationState {
  latitude?: number;
  longitude?: number;
}

const useCurrentLocation = (): CurrentLocationState => {
  const [coords, setCoords] = useState<CurrentLocationState>({});

  useEffect(() => {
    let isMounted = true;

    const loadLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted" || !isMounted) {
          return;
        }

        const currentPosition = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (!isMounted) {
          return;
        }

        setCoords({
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
        });
      } catch {
        if (isMounted) {
          setCoords({});
        }
      }
    };

    void loadLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  return coords;
};

export default useCurrentLocation;
