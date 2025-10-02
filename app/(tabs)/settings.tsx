import { StyleSheet, Text, View } from 'react-native';

export function settings (){

    return(
        <View>
            <Text style={style.text}>This is the settings tab!</Text>
        </View>
    )
}

const style=StyleSheet.create({
    text:{
        backgroundColor:'#0d58c9ff',
        color:'#fff'
    }
});
export default settings;
