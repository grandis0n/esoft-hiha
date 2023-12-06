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
        let body = {
            "last_name": data[0],
            "first_name": data[1],
            "middle_name": data[2]
        }
        body = JSON.stringify(body)
        let status
        const resData = await fetch("https://esoft-hiha.onrender.com/api/agent/all", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        }).then((r) => {
            status = r.status
            return r.json()
        }).catch((e) => {
            return 'bad' + e
        })
        console.log(resData)
        if (status === 200) {
            console.log(resData.data)
            if (resData.data.length !== 0) {
                let agent
                body = JSON.parse(body)
                for (let i = 0; i < resData.data.length; i++) {
                    let item = resData.data[i]
                    if (body.first_name === item.first_name && body.last_name === item.last_name &&
                        body.middle_name === item.middle_name) {
                        agent = {...item}
                        break
                    }
                }
                if (!agent) {
                    setErrorText('Такого пользователя нет')
                    setError(true)
                    return
                }
                console.log(agent)
                await AsyncStorage.setItem('AUTH', JSON.stringify(agent))
                setError(false)
                check()
            } else {
                setErrorText('Такого пользователя нет')
                setError(true)
                return
            }
        } else {
            setErrorText('Невалидные ФИО')
            setError(true)
            return
        }
        console.log(resData)
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