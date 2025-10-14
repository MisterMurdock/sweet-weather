import { SettingsProvider, useSettings } from '@/app/contexts/SettingsContext';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';

function RootLayoutContent() {
  const { effectiveTheme } = useSettings();

   const textStyle = {
    ...styles.text,
    color: effectiveTheme === "dark" ? "#ECEDEE" : "#11181C",
  };

  return (
    <ThemeProvider value={effectiveTheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View
                style={{
                  backgroundColor: '#cfa659ff',
                  padding: 10,
                  
                }}
              >
                <Text
                  style={{
                    ...textStyle,
                    paddingTop: 20,
                    fontSize: 24,
                    fontWeight: "bold",
                    paddingBottom: 20,
                }}
              >
                SweetWeatherApp
              </Text>
              </View>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={effectiveTheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginVertical: 4,
    textAlign: "center",
  },
});

export function RootLayout() {
  return (
    <SettingsProvider>
      <RootLayoutContent />
    </SettingsProvider>
  );
}

export default RootLayout;
