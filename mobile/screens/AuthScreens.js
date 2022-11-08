import {StyleSheet, Text, View} from "react-native";
import DefaultButton from "../components/DefaultButton";
import DefaultInput from "../components/DefaultInput";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function AuthScreens({check}) {

    const style = StyleSheet.create({
        block: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
        },
        block__form: {
            width: "100%",
            padding: 20
        },
        text: {
            fontSize: 20,
            fontWeight: "bold"
        }
    })

    const [isError, setError] = useState(false)
    const [errorText, setErrorText] = useState('Ошибка авторизации')

    const checkAuth = async (data) => {
        data = data.split(' ')
        console.log(data)
        if (data.length !== 3) {
            setErrorText('Невалидные ФИО')
            setError(true)
            return
        }
        // const req = await fetch("https://esoft.onrender.com/api/agent/all", {
        //     body: {
        //         "first_name": data[0],
        //         "middle_name": data[1],
        //         "last_name": data[2]
        //     }
        // }).then((r) => {
        //     return r
        // })
        await AsyncStorage.setItem('AUTH', JSON.stringify(data))
        setError(false)
        check()
    }

    const onCLickCheckAuth = () => {
        checkAuth(data)
    }

    const [data, setData] = useState('')

    const changeData = (value) => {
        setData(value)
    }

    return (
        <View style={style.block}>
            <Text style={style.text}>Авторизация</Text>
            <View style={style.block__form}>
                <DefaultInput placeholder={"Введите ФИО"} onClick={changeData} status={!isError}
                              statusText={errorText}/>
                <DefaultButton text={"Войти"} color={"white"} onClick={onCLickCheckAuth}/>
            </View>
        </View>
    );
}