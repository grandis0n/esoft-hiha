import {StatusBar} from 'expo-status-bar';
import {Dimensions, KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import AuthScreens from "./screens/AuthScreens";
import HomeScreen from "./screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";

export default function App() {

    const style = StyleSheet.create({
        block: {
            minHeight: Math.round(Dimensions.get('window').height),
            display: "flex",
            padding: 20
        }
    })

    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
            check()
        }
        , [])

    const check = async () => {
        let isCheck = await AsyncStorage.getItem('AUTH').then(r => {
            return r
        })
        setIsAuth(isCheck)
        console.log(isCheck)
    }

    const exit = async () => {
        await AsyncStorage.removeItem('AUTH')
        setIsAuth(false)
        console.log(false)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : 'height'}>
            <View style={style.block}>
                <StatusBar theme="auto"/>
                {
                    isAuth ? <HomeScreen exit={exit} user={isAuth}/> : <AuthScreens check={check}/>
                }
            </View>
        </KeyboardAvoidingView>
    );
}
