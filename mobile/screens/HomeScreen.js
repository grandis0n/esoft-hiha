import {StyleSheet, Text, View} from "react-native";
import DangerButton from "../components/DangerButton";

export default function HomeScreen({exit, user}) {

    const style = StyleSheet.create({
        block: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
        },
        block__header: {
            width: "100%",
            padding: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        block__text: {
            fontSize: 18,
            fontWeight: "500",
        },
        text: {
            fontSize: 20,
            fontWeight: "bold",
        }
    })

    return (
        <View style={style.block}>
            <View style={style.block__header}>
                <Text style={style.text}>События</Text>
                <DangerButton text="Выйти" color={"white"} onClick={exit}/>
            </View>
            <Text style={style.block__text}>{user}</Text>
        </View>
    );
}