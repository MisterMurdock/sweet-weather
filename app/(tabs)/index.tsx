import { useWeatherCall } from "@/app/api/use-api";
import { useSettings } from "@/app/contexts/SettingsContext";
import MyButton from "@/components/MyButton";
import WeatherCard from "@/components/WeatherCard";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export function HomeScreen() {
  const [inputText, setInputText] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const { effectiveTheme } = useSettings();
  const params = useLocalSearchParams();

  const {
    loading,
    error,
    weatherAtCurrentLoc,
    weatherAtInputLoc,
    getWeatherAtCurrentLocation,
    getWeatherAtInputLocation,
  } = useWeatherCall();

  // Handle navigation from Favorites
  useFocusEffect(
    useCallback(() => {
      if (params.city && typeof params.city === "string") {
        setInputText(params.city);
        getWeatherAtInputLocation(params.city);

        // Clear the params after using them
        router.setParams({ city: undefined });
      }
    }, [params.city])
  );

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
    <SafeAreaProvider>
      <SafeAreaView style={containerStyle}>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Text style={textStyle}>Enter City</Text>
          <TextInput
            id="city-input"
            value={inputText}
            style={inputStyle}
            placeholder="Enter city..."
            placeholderTextColor={effectiveTheme === "dark" ? "#888" : "#999"}
            onChangeText={setInputText}
            onSubmitEditing={() => getWeatherAtInputLocation(inputText)}
            returnKeyType="search"
          />
          <Text
            style={{
              ...textStyle,
              fontSize: 14,
              marginBottom: 10,
              opacity: 0.7,
            }}
          >
            {"(add Country letters for accurate results. ex. London, UK)"}
          </Text>
          <MyButton
            buttonText="Search city!"
            buttonPress={() => {
              getWeatherAtInputLocation(inputText);
              // clear input box
              setInputText("");
            }}
          />
          {weatherAtInputLoc && (
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <WeatherCard
                weather={{ ...weatherAtInputLoc, title: "Searched Location" }}
              />
              {savedMessage !== "" && (
                <Text
                  style={{
                    ...textStyle,
                    color: "#4caf50",
                    marginTop: 8,
                    fontSize: 14,
                  }}
                >
                  ✓ {savedMessage}
                </Text>
              )}
            </View>
          )}

          {loading && <Text style={textStyle}>Loading weather...</Text>}
          {error && (
            <Text style={{ ...textStyle, color: "#ff4444" }}>
              Error: {error}
            </Text>
          )}

          {weatherAtCurrentLoc && (
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <WeatherCard
                weather={{ ...weatherAtCurrentLoc, title: "Current Location" }}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <MyButton
        buttonText={"Get local " + "\n" + "weather!"}
        buttonPress={getWeatherAtCurrentLocation}
        style={{
          marginRight: 20,
          marginBottom: 10,
          position: "absolute",
          bottom: 20,
          alignSelf: "flex-end",
          paddingHorizontal: 5,
          borderRadius: 30,
        }}
      />
    </SafeAreaProvider>
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
    minWidth: 200,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
  },
});

export default HomeScreen;
