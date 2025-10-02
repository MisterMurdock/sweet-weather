import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet, Text, View } from 'react-native';

export function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>Edit app/index.tsx to edit this screen. Some more text</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff'
  }
});
export default HomeScreen;
