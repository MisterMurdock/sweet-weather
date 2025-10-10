import { useSettings } from "@/app/contexts/SettingsContext";
import { StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export function Settings() {
  const { theme, temperatureUnit, setTheme, setTemperatureUnit, effectiveTheme } = useSettings();

  const isFahrenheit = temperatureUnit === "fahrenheit";
  const isDarkMode = theme === "dark";

  const toggleUnitSwitch = () => {
    setTemperatureUnit(isFahrenheit ? "celsius" : "fahrenheit");
  };

  const toggleThemeSwitch = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={containerStyle}>
        <Text style={{ ...textStyle, fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Settings
        </Text>
        <View style={styles.settingRow}>
          <Text style={textStyle}>
            Temp Unit: {temperatureUnit === "celsius" ? "Celsius (°C)" : "Fahrenheit (°F)"}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={isFahrenheit ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleUnitSwitch}
            value={isFahrenheit}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={textStyle}>
            Theme: {theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System"}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleThemeSwitch}
            value={isDarkMode}
          />
        </View>

        <Text style={{ ...textStyle, marginTop: 20, fontSize: 12, opacity: 0.7 }}>
          Currently using: {effectiveTheme === "dark" ? "Dark Mode" : "Light Mode"}
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Settings;