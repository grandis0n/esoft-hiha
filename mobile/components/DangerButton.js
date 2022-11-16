import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {useState} from "react";


export default function DangerButton({text, color, onClick, fontWeight}) {

    const styles = StyleSheet.create({
        buttonNormal: {
            padding: 10,
            backgroundColor: '#FF1744',
            alignItems: "center",
            justifyContent: "center",
            color: color,
            borderRadius: 3,
            marginTop: 10,
            marginBottom: 10
        },
        buttonPress: {
            padding: 10,
            backgroundColor: '#e3002c',
            alignItems: "center",
            justifyContent: "center",
            color: color,
            borderRadius: 3,
            marginTop: 10,
            marginBottom: 10
        },
        text: {
            color: color,
            fontSize: 15,
            fontWeight: fontWeight ? fontWeight : 'normal'
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