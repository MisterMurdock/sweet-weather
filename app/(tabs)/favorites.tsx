import { useSettings } from "@/app/contexts/SettingsContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface WeatherData {
  main?: {
    temp: number;
  };
  weather?: {
    description: string;
  }[];
  name?: string;
}

export function Favorites() {
  const { favorites, removeFavorite, effectiveTheme, convertTemperature, getTemperatureSymbol } = useSettings();
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<{ [key: string]: WeatherData }>({});
  const [loadingCities, setLoadingCities] = useState<{ [key: string]: boolean }>({});

  // Fetch weather for each favorite when screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchWeatherForFavorites = async () => {
        // Clear old weather data for removed favorites
        const favoriteNames = favorites.map(f => f.cityName);
        setWeatherData(prev => {
          const filtered: { [key: string]: WeatherData } = {};
          Object.keys(prev).forEach(key => {
            if (favoriteNames.includes(key)) {
              filtered[key] = prev[key];
            }
          });
          return filtered;
        });

        for (const favorite of favorites) {
          setLoadingCities((prev) => ({ ...prev, [favorite.cityName]: true }));

          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${favorite.cityName}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&units=metric`
            );

            if (response.ok) {
              const data = await response.json();
              setWeatherData((prev) => ({ ...prev, [favorite.cityName]: data }));
            }
          } catch (err) {
            console.error(`Error fetching weather for ${favorite.cityName}:`, err);
          } finally {
            setLoadingCities((prev) => ({ ...prev, [favorite.cityName]: false }));
          }
        }
      };

      if (favorites.length > 0) {
        fetchWeatherForFavorites();
      } else {
        // Clear all data if no favorites
        setWeatherData({});
        setLoadingCities({});
      }
    }, [favorites])
  );

  const handleFavoritePress = (cityName: string) => {
    // Navigate to home screen and trigger weather search
    router.push({
      pathname: "/",
      params: { city: cityName },
    });
  };

  const handleRemoveFavorite = (cityName: string) => {
    removeFavorite(cityName);
    setWeatherData((prev) => {
      const newData = { ...prev };
      delete newData[cityName];
      return newData;
    });
  };

  const containerStyle = {
    ...styles.container,
    backgroundColor: effectiveTheme === "dark" ? "#151718" : "#fff",
  };

  const textStyle = {
    ...styles.text,
    color: effectiveTheme === "dark" ? "#ECEDEE" : "#11181C",
  };

  const cardStyle = {
    ...styles.favoriteCard,
    backgroundColor: effectiveTheme === "dark" ? "#2a2a2a" : "#f5f5f5",
    borderColor: effectiveTheme === "dark" ? "#444" : "#ddd",
  };

  if (favorites.length === 0) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={containerStyle}>
          <Text style={{ ...textStyle, fontSize: 16, opacity: 0.7 }}>
            No favorites yet. Search for a city and save it to your favorites!
          </Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={containerStyle}>
        <Text style={{ ...textStyle, fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          My Favorites
        </Text>
        <FlatList
          key={favorites.length} // Force re-render when favorites count changes
          data={favorites}
          keyExtractor={(item) => item.cityName}
          extraData={favorites} // Tell FlatList to watch favorites array
          renderItem={({ item }) => {
            const weather = weatherData[item.cityName];
            const isLoading = loadingCities[item.cityName];

            return (
              <Pressable
                style={cardStyle}
                onPress={() => handleFavoritePress(item.cityName)}
              >
                <View style={styles.cardContent}>
                  <View style={styles.cityInfo}>
                    <Text style={{ ...textStyle, fontSize: 20, fontWeight: "600" }}>
                      {item.cityName}
                    </Text>
                    {isLoading ? (
                      <ActivityIndicator size="small" color={effectiveTheme === "dark" ? "#fff" : "#000"} />
                    ) : weather ? (
                      <>
                        <Text style={{ ...textStyle, fontSize: 28, fontWeight: "bold" }}>
                          {convertTemperature(weather.main?.temp || 0).toFixed(1)}{getTemperatureSymbol()}
                        </Text>
                        <Text style={{ ...textStyle, fontSize: 14, opacity: 0.7 }}>
                          {weather.weather?.[0]?.description}
                        </Text>
                      </>
                    ) : null}
                  </View>
                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => handleRemoveFavorite(item.cityName)}
                  >
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color={effectiveTheme === "dark" ? "#ff6b6b" : "#ff4444"}
                    />
                  </Pressable>
                </View>
              </Pressable>
            );
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
  favoriteCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cityInfo: {
    flex: 1,
  },
  deleteButton: {
    padding: 8,
  },
});

export default Favorites;