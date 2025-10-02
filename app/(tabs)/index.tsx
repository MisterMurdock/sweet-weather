import MyButton from "@/components/MyButton";
import { useColorScheme } from "@/hooks/use-color-scheme";
import useStorage from '@/hooks/use-storage';
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export function HomeScreen() {
  const [inputText, setInputText] = useState("");
  const { saveFavorite } = useStorage();
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>Enter City!</Text>
      <TextInput
        style={styles.inputbox}
        placeholder="Enter city..."
        onChangeText={setInputText}
      ></TextInput>
      <MyButton
        buttonText="Get weather!"
        buttonPress={() => {
          console.log(inputText);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
  inputbox: {
    color: "#fff",
    borderColor: "#b4b4b4ff",
    borderWidth: 2,
  },
});
export default HomeScreen;
