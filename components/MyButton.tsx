import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type MyButtonProps = {
    buttonText: string;
    buttonPress: () => void;
    style? : ViewStyle
};

export default function MyButton({ buttonText, buttonPress, style }: MyButtonProps) {

    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={buttonPress}>
            <Text>{buttonText}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create ({
    button :{
    marginTop: 3,
    alignItems: 'center',
    backgroundColor: '#cfa659ff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2
    }

})

// export default MyButton;