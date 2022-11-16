import {FlatList, RefreshControl, StyleSheet, Text, View} from "react-native";
import DangerButton from "../components/DangerButton";
import {useEffect, useState} from "react";
import EventCard from "../components/EventCard";
import DefaultButton from "../components/DefaultButton";

export default function HomeScreen({exit, user, setIsCreateScreen}) {

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
            padding: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        block__header__heading: {
            fontSize: 20
        },
        block__topBlock: {
            display: "flex",
            flexDirection: "row"
        },
        block__topBlock__heading: {
            fontSize: 20
        },
        block__text: {
            fontSize: 18,
            fontWeight: "500",
            width: "100%"
        },
    })

    const [events, setEvents] = useState([])
    const [isLoading, setLoading] = useState(true)

    const getEvents = async () => {
        setLoading(true)
        let body = {
            "agent_id": user.id
        }
        body = JSON.stringify(body)
        let status
        const resData = await fetch("https://esoft.onrender.com/api/event/", {
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
        console.log(resData.data)
        if (status === 200) {
            console.log(resData.data + '1')
            setEvents([...resData.data])
        } else {

        }
        setLoading(false)
    }

    useEffect(() => {
        getEvents()
    }, []);

    return (
        <View style={style.block}>
            <View style={style.block__header}>
                <Text style={style.block__header__heading}>События</Text>
                <DangerButton text="Выйти" color={"white"} onClick={exit}/>
            </View>
            <Text style={style.block__text}>{user.last_name + ' ' + user.first_name + ' ' + user.middle_name}</Text>
            <DefaultButton text={"Создать событие"} color={"white"} onClick={() => setIsCreateScreen(true)}/>
            <View style={{width: '100%'}}>
                {
                    isLoading
                        ?
                        <Text>Загрузка...</Text>
                        :
                        <View style={{width: '100%'}}>
                            {
                                events.length === 0
                                    ?
                                    <Text>Пока событий на сегодня нет</Text>
                                    :
                                    <FlatList
                                        style={{marginBottom: 140, width: '100%'}}
                                        refreshControl={<RefreshControl refreshing={false} onRefresh={getEvents}/>}
                                        data={events}
                                        renderItem={({item}) => <EventCard event={item} getEvents={getEvents}/>}/>
                            }
                        </View>
                }
            </View>
        </View>
    );
}