import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

interface Favorite {
  cityName: string;
}

export default function useStorage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("favorites").then((result) => {
      if (result !== null) {
        const favorites = JSON.parse(result);
        setFavorites(favorites);
      }
    });
  }, []);

  const saveFavorite = (cityName: string) => {
    setFavorites((current) => {
      // Prevent duplicates
      if (current.some((fav) => fav.cityName === cityName)) {
        return current;
      }
      
      const favorites = [...current, { cityName }];
      AsyncStorage.setItem("favorites", JSON.stringify(favorites))
        .catch((err) => console.error(err));
      return favorites;
    });
  };

  const removeFavorite = (cityName: string) => {
    setFavorites((current) => {
      const favorites = current.filter((fav) => fav.cityName !== cityName);
      AsyncStorage.setItem("favorites", JSON.stringify(favorites))
        .catch((err) => console.error(err));
      return favorites;
    });
  };

  return { favorites, saveFavorite, removeFavorite };
}
