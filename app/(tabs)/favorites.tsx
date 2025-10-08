import { useSettings } from "@/app/contexts/SettingsContext";
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export function Favorites (){

    const { effectiveTheme } = useSettings();

    const containerStyle = {
    ...styles.container,
    backgroundColor: effectiveTheme === "dark" ? "#151718" : "#fff",
  };
    const textStyle = {
    ...styles.text,
    color: effectiveTheme === "dark" ? "#ECEDEE" : "#11181C",
  };

    return(
            <SafeAreaProvider>
              <SafeAreaView style={containerStyle}>
        
                <Text style={{ ...textStyle, marginTop: 20, fontSize: 12, opacity: 0.7 }}>
                    No favorites yet. Add some from the main screen!
                </Text>
              </SafeAreaView>
            </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: '#0d58c9ff',
        color: '#fff'
    },
    container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  }
});
export default Favorites;