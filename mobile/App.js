import {StatusBar} from 'expo-status-bar';
import {Dimensions, KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import AuthScreens from "./screens/AuthScreens";
import HomeScreen from "./screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import CreateEventScreen from "./screens/CreateEventScreen";

export default function App() {

    const style = StyleSheet.create({
        block: {
            minHeight: Math.round(Dimensions.get('window').height),
            display: "flex",
            padding: 20
        }
    })

    const [isAuth, setIsAuth] = useState(false)
    const [isCreateScreen, setIsCreateScreen] = useState(false)

    useEffect(() => {
            check()
        }
        , [])

    const check = async () => {
        let isCheck = await AsyncStorage.getItem('AUTH').then(r => {
            return r
        })
        setIsAuth(JSON.parse(isCheck))
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
                    !isAuth && <AuthScreens check={check}/>
                }
                {
                    (isAuth && !isCreateScreen) &&
                    <HomeScreen exit={exit} user={isAuth} setIsCreateScreen={setIsCreateScreen}/>
                }
                {
                    (isAuth && isCreateScreen) &&
                    <CreateEventScreen exit={exit} user={isAuth} setIsCreateScreen={setIsCreateScreen}/>
                }
            </View>
        </KeyboardAvoidingView>
    );
}
