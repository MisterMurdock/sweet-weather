import * as Location from 'expo-location';
import { useEffect, useState } from "react";

interface CurrentLocation {
  latitude: string;
  longitude: string;
}

interface WeatherData {
  main?: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather?: {
    main: string;
    description: string;
  }[];
  name?: string;
}

export function useWeatherCall() {
  const [currentPos, setCurrentPos] = useState<CurrentLocation>({
    latitude: "",
    longitude: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherAtCurrentLoc, setWeatherAtCurrentLoc] = useState<WeatherData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Request permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          return;
        }

        // Get location
        let location = await Location.getCurrentPositionAsync({});
        setCurrentPos({
          latitude: location.coords.latitude.toString(),
          longitude: location.coords.longitude.toString(),
        });
        console.log("Latitude:", location.coords.latitude);
        console.log("Longitude:", location.coords.longitude);
      } catch (err) {
        console.log("Error getting location:", err);
        setError("Failed to get location: " + (err instanceof Error ? err.message : String(err)));
      }
    })();
  }, []);

  const getWeatherAtCurrentLocation = async () => {
    if (!currentPos.latitude || !currentPos.longitude) {
      setError("Location not available yet");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
     `https://api.openweathermap.org/data/2.5/weather?lat=${currentPos.latitude}&lon=${currentPos.longitude}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&units=metric`
   );

      if (!response.ok) {
        throw new Error("Failed to fetch Weather");
      }

      const data = await response.json();
      setWeatherAtCurrentLoc(data);
      console.log("Fetched Weather:", data);
    } catch (err) {
      console.error("Error fetching Weather:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };


  //https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_key}&units=metric
  //use this endpoint to find city by name

  return {
    currentPos,
    loading,
    error,
    weatherAtCurrentLoc,
    getWeatherAtCurrentLocation,
  };
}

export default useWeatherCall;