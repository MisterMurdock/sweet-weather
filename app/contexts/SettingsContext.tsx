import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

type Theme = "light" | "dark" | "system";
type TemperatureUnit = "celsius" | "fahrenheit";

interface SettingsContextType {
  theme: Theme;
  temperatureUnit: TemperatureUnit;
  setTheme: (theme: Theme) => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  effectiveTheme: "light" | "dark"; // The actual theme being used
  convertTemperature: (tempInCelsius: number) => number;
  getTemperatureSymbol: () => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const [theme, setThemeState] = useState<Theme>("system");
  const [temperatureUnit, setTemperatureUnitState] = useState<TemperatureUnit>("celsius");
  const [isLoaded, setIsLoaded] = useState(false);

  // Determine the effective theme
  const effectiveTheme: "light" | "dark" = 
    theme === "system" 
      ? (systemColorScheme ?? "light")
      : theme;

  // Load settings from AsyncStorage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [savedTheme, savedUnit] = await Promise.all([
          AsyncStorage.getItem("theme"),
          AsyncStorage.getItem("temperatureUnit"),
        ]);

        if (savedTheme) {
          setThemeState(savedTheme as Theme);
        }
        if (savedUnit) {
          setTemperatureUnitState(savedUnit as TemperatureUnit);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadSettings();
  }, []);

  // Save theme to AsyncStorage
  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem("theme", newTheme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  // Save temperature unit to AsyncStorage
  const setTemperatureUnit = async (newUnit: TemperatureUnit) => {
    setTemperatureUnitState(newUnit);
    try {
      await AsyncStorage.setItem("temperatureUnit", newUnit);
    } catch (error) {
      console.error("Error saving temperature unit:", error);
    }
  };

  // Convert temperature from Celsius to the selected unit
  const convertTemperature = (tempInCelsius: number): number => {
    if (temperatureUnit === "fahrenheit") {
      return (tempInCelsius * 9) / 5 + 32;
    }
    return tempInCelsius;
  };

  // Get temperature symbol
  const getTemperatureSymbol = (): string => {
    return temperatureUnit === "fahrenheit" ? "°F" : "°C";
  };

  // Don't render children until settings are loaded
  if (!isLoaded) {
    return null;
  }

  return (
    <SettingsContext.Provider
      value={{
        theme,
        temperatureUnit,
        setTheme,
        setTemperatureUnit,
        effectiveTheme,
        convertTemperature,
        getTemperatureSymbol,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}