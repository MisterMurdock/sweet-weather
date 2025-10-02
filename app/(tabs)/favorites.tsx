import { StyleSheet, Text, View } from 'react-native';

export function favorites (){

    return(
        <View>
            <Text style={style.text}>This is the favotites tab!</Text>
        </View>
    )
}

const style=StyleSheet.create({
    text:{
        backgroundColor:'#0d58c9ff',
        color:'#fff'
    }
});
export default favorites;