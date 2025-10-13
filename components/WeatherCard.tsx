import { useSettings } from "@/app/contexts/SettingsContext";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MyButton from "./MyButton";


interface WeatherCardProps {
  weather: {
    title: string;
    name?: string;
    main?: { temp: number };
    weather?: { icon?: string; description?: string }[];
  };
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const { effectiveTheme, convertTemperature, getTemperatureSymbol, saveFavorite } = useSettings();
    const [savedMessage, setSavedMessage] = useState("");

  const textStyle = {
    color: effectiveTheme === "dark" ? "#ECEDEE" : "#11181C",
    textAlign: "center" as const,
  };

  return (
    <View style={styles.card}>
      <Text style={{ ...textStyle, fontSize: 16, fontWeight: "bold" }}>
        {weather.title}
      </Text>
      {weather.weather?.[0]?.icon && (
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
          }}
          style={styles.icon}
        />
      )}
      <Text style={{ ...textStyle, fontSize: 20, fontWeight: "bold" }}>
        {weather.name}
      </Text>
      <Text style={textStyle}>
        {convertTemperature(weather.main?.temp || 0).toFixed(1)}
        {getTemperatureSymbol()}
      </Text>
      <Text style={{ ...textStyle, fontSize: 14, opacity: 0.7 }}>
        {weather.weather?.[0]?.description}
      </Text>
      <MyButton
        buttonText="⭐ Save to Favorites"
        buttonPress={() => {
          if (weather.name) {
            saveFavorite(weather.name);
            setSavedMessage(`${weather.name} saved to favorites!`);
            setTimeout(() => setSavedMessage(""), 3000);
          }
        }}
            />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
});
