import { StyleSheet, Text, TouchableOpacity } from "react-native";

type MyButtonProps = {
    buttonText: string;
    buttonPress: () => void;
};

export default function MyButton({ buttonText, buttonPress }: MyButtonProps) {

    return (
        <TouchableOpacity
            style={style.button}
            onPress={buttonPress}>
            <Text>{buttonText}</Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create ({
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