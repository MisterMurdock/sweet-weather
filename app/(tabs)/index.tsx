import { useSettings } from "@/app/contexts/SettingsContext";
import MyButton from "@/components/MyButton";
import { useWeatherCall } from "@/hooks/api/use-api";
import useStorage from '@/hooks/use-storage';
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export function HomeScreen() {
  const [inputText, setInputText] = useState("");
  const { saveFavorite } = useStorage();
  const { effectiveTheme, convertTemperature, getTemperatureSymbol } = useSettings();
  
  const { loading, error, weatherAtCurrentLoc, weatherAtInputLoc,
     getWeatherAtCurrentLocation, getWeatherAtInputLocation,
     currentPos } = useWeatherCall();

  // Dynamic styles based on theme
  const containerStyle = {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    padding: 20,
    backgroundColor: effectiveTheme === "dark" ? "#151718" : "#fff",
  };

  const textStyle = {
    ...styles.text,
    color: effectiveTheme === "dark" ? "#ECEDEE" : "#11181C",
  };

  const inputStyle = {
    ...styles.inputbox,
    backgroundColor: effectiveTheme === "dark" ? "#2a2a2a" : "#fff",
    borderColor: effectiveTheme === "dark" ? "#444" : "#ccc",
    color: effectiveTheme === "dark" ? "#ECEDEE" : "#11181C",
  };

  return (
    <>
      <View style={containerStyle}>
        <Text style={textStyle}>Enter City</Text>
        <TextInput
          style={inputStyle}
          placeholder="Enter city..."
          placeholderTextColor={effectiveTheme === "dark" ? "#888" : "#999"}
          onChangeText={setInputText}
        />
        <Text style={{...textStyle, fontSize: 14, marginBottom: 10, opacity: 0.7}}>
          (add Country letters for accurate results. ex. London, UK)
        </Text>
        <MyButton
          buttonText="Search city!"
          buttonPress={() => getWeatherAtInputLocation(inputText)}
        />
        {weatherAtInputLoc && (
          <View style={{ marginTop: 20 }}>
            <Text style={textStyle}>
              City: {weatherAtInputLoc.name}
            </Text>
            <Text style={textStyle}>
              Temp: {convertTemperature(weatherAtInputLoc.main?.temp || 0).toFixed(1)}{getTemperatureSymbol()}
            </Text>
            <Text style={textStyle}>
              Weather: {weatherAtInputLoc.weather?.[0]?.description}
            </Text>
          </View>
        )}
        
        {loading && <Text style={textStyle}>Loading weather...</Text>}
        {error && <Text style={{...textStyle, color: '#ff4444'}}>Error: {error}</Text>}
        
        {weatherAtCurrentLoc && (
          <View style={{ marginTop: 20 }}>
            <Text style={textStyle}>
              City: {weatherAtCurrentLoc.name}
            </Text>
            <Text style={textStyle}>
              Temp: {convertTemperature(weatherAtCurrentLoc.main?.temp || 0).toFixed(1)}{getTemperatureSymbol()}
            </Text>
            <Text style={textStyle}>
              Weather: {weatherAtCurrentLoc.weather?.[0]?.description}
            </Text>
          </View>
        )}
      </View>
      <MyButton
        buttonText="Get local weather!"
        buttonPress={getWeatherAtCurrentLocation}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginVertical: 4,
    textAlign: "center",
  },
  inputbox: {
    width: "40%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
  },
});

export default HomeScreen;