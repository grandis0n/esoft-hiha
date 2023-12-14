import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {useState} from "react";


export default function DefaultButton({text, color, onClick}) {

    const styles = StyleSheet.create({
        buttonNormal: {
            padding: 10,
            backgroundColor: '#04A0FF',
            alignItems: "center",
            justifyContent: "center",
            color: color,
            borderRadius: 3,
            marginTop: 10,
            marginBottom: 15,
            fontWeight: "bold",
            height: 45,
            width: 150,
        },
        buttonPress: {
            padding: 10,
            backgroundColor: '#0091ea',
            alignItems: "center",
            justifyContent: "center",
            color: color,
            borderRadius: 3,
            fontWeight: "bold",
            marginTop: 10,
            marginBottom: 15,
            height: 45,
            width: 150,
        },
        text: {
            color: color,
            fontSize: 17,
            fontWeight: "bold",
        }
    })

    let [isPress, setIsPress] = useState(false);

    let touchProps = {
        style: isPress ? styles.buttonPress : styles.buttonNormal,
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
        onPress: onClick
    };

    return (
        <View>
            <TouchableHighlight {...touchProps}>
                <Text style={styles.text}>{text}</Text>
            </TouchableHighlight>
        </View>
    );
}