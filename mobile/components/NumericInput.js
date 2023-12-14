import {StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";


export default function NumericInput({text, color, onClick, placeholder, status, statusText, type = 'text'}) {

    const styles = StyleSheet.create({
        buttonNormal: {
            padding: 10,
            backgroundColor: 'white',
            alignItems: "center",
            justifyContent: "center",
            color: '#fcfafa',
            borderRadius: 3,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: status ? '#CFD8DC' : '#FF1744',
            marginTop: 10,
            marginBottom: 10
        },
        buttonPress: {
            padding: 10,
            backgroundColor: 'white',
            alignItems: "center",
            justifyContent: "center",
            color: '#237496',
            borderRadius: 3,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: '#04A0FF',
            marginTop: 10,
            marginBottom: 10
        },
        text: {
            color: '#FF1744',
            fontSize: 22
        }
    })

    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(false);

    const changeValue = (value) => {
        onClick(value)
        setValue(value)
    }

    let touchProps = {
        style: isFocus ? styles.buttonPress : styles.buttonNormal,
        onFocus: () => setIsFocus(true),
        onBlur: () => setIsFocus(false),
        placeholder: placeholder,
        onChangeText: changeValue,
        type: type,
        keyboardType: 'numeric'
    };

    return (
        <View>
            <TextInput {...touchProps}/>
            {
                !status &&
                <Text style={styles.text}>{statusText}</Text>
            }
        </View>
    );
}