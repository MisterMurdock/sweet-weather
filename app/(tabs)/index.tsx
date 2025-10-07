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
  
  const { loading, error, weatherAtCurrentLoc, weatherAtInputLoc,
     getWeatherAtCurrentLocation, getWeatherAtInputLocation,
     currentPos } = useWeatherCall();

  return (
    <>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={styles.text}>Enter City</Text>
      <TextInput
        style={styles.inputbox}
        placeholder="Enter city..."
        onChangeText={setInputText}
      />
      <Text style={{...styles.text, fontSize: 14, marginBottom: 10}}>
        (add Country letters for accurate results. ex. London, UK)
      </Text>
      <MyButton
        buttonText="Search city!"
        buttonPress={() => getWeatherAtInputLocation(inputText)}
      />
      {weatherAtInputLoc && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>
            City: {weatherAtInputLoc.name}
          </Text>
          <Text style={styles.text}>
            Temp: {weatherAtInputLoc.main?.temp}°C
          </Text>
          <Text style={styles.text}>
            Weather: {weatherAtInputLoc.weather?.[0]?.description}
          </Text>
        </View>
      )}
      
      
      {/* Debug info
      <Text style={styles.text}>Lat: {currentPos.latitude}</Text>
      <Text style={styles.text}>Long: {currentPos.longitude}</Text> */}
      
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
    color: "#a3a3a3ff",
    marginVertical: 4,
    textAlign: "center",
  },
  inputbox: {
    width: "40%",
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
