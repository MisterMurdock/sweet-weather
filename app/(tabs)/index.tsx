import MyButton from "@/components/MyButton";
import { useWeatherCall } from "@/hooks/api/use-api";
import { useColorScheme } from "@/hooks/use-color-scheme";
import useStorage from '@/hooks/use-storage';
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export function HomeScreen() {
  const [inputText, setInputText] = useState("");
  const { saveFavorite } = useStorage();
  const colorScheme = useColorScheme();
  
  const { loading, error, weatherAtCurrentLoc, getWeatherAtCurrentLocation, currentPos } = useWeatherCall();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={styles.text}>Enter City!</Text>
      <TextInput
        style={styles.inputbox}
        placeholder="Enter city..."
        onChangeText={setInputText}
      />
      <MyButton
        buttonText="Get weather!"
        buttonPress={getWeatherAtCurrentLocation}
      />
      
      {/* Debug info */}
      <Text style={styles.text}>Lat: {currentPos.latitude}</Text>
      <Text style={styles.text}>Long: {currentPos.longitude}</Text>
      
      {loading && <Text style={styles.text}>Loading weather...</Text>}
      {error && <Text style={{...styles.text, color: 'red'}}>Error: {error}</Text>}
      
      {weatherAtCurrentLoc && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>
            City: {weatherAtCurrentLoc.name}
          </Text>
          <Text style={styles.text}>
            Temp: {weatherAtCurrentLoc.main?.temp}°C
          </Text>
          <Text style={styles.text}>
            Weather: {weatherAtCurrentLoc.weather?.[0]?.description}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "#a3a3a3ff",
    marginVertical: 4,
    textAlign: "center",
  },
  inputbox: {
    width: "30%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});
export default HomeScreen;
