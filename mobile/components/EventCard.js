import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import DangerButton from "./DangerButton";

const EventCard = ({event, getEvents}) => {

    const style = StyleSheet.create({
        wrapper_card: {
            borderStyle: "solid",
            borderColor: 'black',
            borderWidth: 2,
            borderRadius: 3,
            marginBottom: 5,
            padding: 5,
        },
        card: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        card__contentBlock: {},
        card__contentBlock__header: {
            display: "flex",
            flexDirection: "row"
        },
        card__contentBlock__header__heading: {
            fontWeight: "bold",
            marginRight: 5
        },
        card__contentBlock__body: {
            display: "flex",
            flexDirection: "column"
        },
        wrapperCard__errorText: {
            color: '#FF1744'
        }
    })

    const [isError, setIsError] = useState(false)

    const deleteEvent = async (id) => {
        console.log(id)
        let status
        const resData = await fetch(`https://esoft-hiha.onrender.com/api/event/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((r) => {
            status = r.status
            return r.json()
        }).catch((e) => {
            return 'bad' + e
        })
        if (status === 200) {
            setIsError(false)
            getEvents()
        } else {
            setIsError(true)
        }
    }

    return (
        <View style={style.wrapper_card}>
            {
                isError && <Text style={style.wrapperCard__errorText}>Ошибка при удалении, попробуйте еще раз позже</Text>
            }
            <View style={style.card}>
                <View style={style.card__contentBlock}>
                    <View style={style.card__contentBlock__header}>
                        <Text style={style.card__contentBlock__header__heading}> {
                            {
                                1: 'Встреча',
                                2: 'Показ',
                                3: 'Звонок',
                            }[event.type_id]
                        }
                        </Text>
                        <Text>{event.datetime.split('T')[0] + ' в ' + event.datetime.split('T')[1].slice(0, 5)}</Text>
                    </View>
                    <View style={style.card__contentBlock__body}>
                        {
                            event.comment && <Text>{event.comment}</Text>
                        }
                        <Text>Длительность: {event.duration ? event.duration + 'мин' : '∞'}</Text>
                    </View>
                </View>
                <DangerButton text={"X"} color="white" fontWeight={"bold"} onClick={() => deleteEvent(event.id)}/>
            </View>
        </View>
    );
};

export default EventCard;
