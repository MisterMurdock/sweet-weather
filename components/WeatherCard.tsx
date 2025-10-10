import { useSettings } from "@/app/contexts/SettingsContext";
import { Image, StyleSheet, Text, View } from "react-native";

interface WeatherCardProps {
  weather: {
    name?: string;
    main?: { temp: number };
    weather?: { icon?: string; description?: string }[];
  };
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const { effectiveTheme, convertTemperature, getTemperatureSymbol } = useSettings();

  const textStyle = {
    color: effectiveTheme === "dark" ? "#ECEDEE" : "#11181C",
    textAlign: "center" as const,
  };

  return (
    <View style={styles.card}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
});
