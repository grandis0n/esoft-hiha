import {StyleSheet, Text, View} from "react-native";
import DangerButton from "../components/DangerButton";
import {useState} from "react";
import DefaultButton from "../components/DefaultButton";
import DefaultInput from "../components/DefaultInput";
import NumericInput from "../components/NumericInput";
import RadioButton from "react-native-radio-buttons-group/lib/RadioButton";

export default function CreateEventScreen({exit, user, setIsCreateScreen}) {

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
            flexDirection: "row",
            width: "100%"
        },
        block__content: {
            display: "flex",
            width: "100%"
        },
        block__text: {
            fontSize: 18,
            fontWeight: "500",
            width: "100%"
        },
        form__text: {
            fontSize: 18
        }
    })

    const [type, setType] = useState(1);
    const [comment, setComment] = useState('');
    const [duration, setDuration] = useState(0);
    const [dateTime, setDateTime] = useState('');
    const [message, setMessage] = useState('');


    const [statusComment, setStatusComment] = useState(true);
    const [statusDuration, setStatusDuration] = useState(true);
    const [statusDateTime, setStatusDateTime] = useState(true);

    const createEvent = async () => {
        let isError = false
        if (isNaN(parseInt(duration.toString())) || duration == 0) {
            setStatusDuration(false)
            isError = true
        } else {
            setStatusDuration(true)
        }
        if (!dateTime) {
            setStatusDateTime(false)
            isError = true
        } else {
            let temp = dateTime.split(' ')
            if (temp.length === 2) {
                const regexDateFirst = new RegExp("^([0-3][0-9])\\.([1][0-2])\\.([2][0-9]{3})$");
                const regexDateSecond = new RegExp("^([0][1-9])\\.([0][1-9])\\.([2][0-9]{3})$");
                const regexTimeFirst = new RegExp("^([1-5][0-9]):([0-5][0-9])$");
                const regexTimeSecond = new RegExp("^([0][1-9]):([0-5][0-9])$");
                if ((regexDateFirst.test(temp[0]) || regexDateSecond.test(temp[0])) && (regexTimeFirst.test(temp[1])
                    || regexTimeSecond.test(temp[1]))) {
                    setStatusDateTime(true)
                    isError = false
                } else {
                    setStatusDateTime(false)
                    isError = true
                }
            } else {
                setStatusDateTime(false)
                isError = true
            }
        }
        console.log(isError, dateTime)
        if (!isError) {
            let tempDateTime = dateTime
            tempDateTime = tempDateTime.split(' ')
            tempDateTime[0] = tempDateTime[0].split('.')
            tempDateTime[1] = tempDateTime[1].split(':')
            console.log(tempDateTime)
            let dateTimeObject = new Date()
            dateTimeObject.setFullYear(parseInt(tempDateTime[0][2]), parseInt(tempDateTime[0][1]) - 1, parseInt(tempDateTime[0][0]))
            dateTimeObject.setHours(parseInt(tempDateTime[1][0]) + 3, parseInt(tempDateTime[1][1]))
            console.log(dateTimeObject.toISOString())
            let body = {
                "agent_id": user.id,
                "type_id": type,
                "comment": comment,
                "duration": duration,
                "datetime": dateTimeObject.toISOString()
            }
            body = JSON.stringify(body)
            let status
            const resData = await fetch("https://esoft-hiha.onrender.com/api/event/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            }).then((r) => {
                status = r.status
                return r.json()
            }).catch((e) => {
                return e
            })
            console.log(resData)
            if (status === 200) {
                setMessage('Событие создалось удачно!')
            } else {
                setMessage('Ошибка при создании, попробуйте еще раз!')
            }
        }
    }

    return (
        <View style={style.block}>
            <View style={style.block__header}>
                <Text style={style.block__header__heading}>Создание события</Text>
                <DangerButton text="Выйти" color={"white"} onClick={exit}/>
            </View>
            <View style={style.block__topBlock}>
                <DangerButton text={"Назад"} color={"white"} onClick={() => setIsCreateScreen(false)}/>
            </View>
            {
                message === ''
                    ? <>
                        <View style={style.block__content}>
                            <DefaultInput placeholder={"Введите комментарий"} status={statusComment} text={comment}
                                          onClick={setComment}/>
                            <DefaultInput placeholder={"Введите дату, типа ДД.ММ.ГГГГ ЧЧ:ММ"} status={statusDateTime}
                                          text={dateTime} statusText={"Неправильный формат даты"}
                                          onClick={setDateTime}/>
                            <NumericInput placeholder={"Введите длительность"} status={statusDuration} text={duration}
                                          onClick={setDuration} statusText={"Неправильный формат длительности"}/>
                            <View>
                                <Text style={style.form__text}>Выберите тип события</Text>
                                <RadioButton id={'fkdkfl;d'} label={"Встреча"} selected={type === 1}
                                             onPress={() => setType(1)} size={20}/>
                                <RadioButton id={'fkdkfl;d'} label={"Показ"} selected={type === 2}
                                             onPress={() => setType(2)} size={20}/>
                                <RadioButton id={'fkdkfl;d'} label={"Звонок"} selected={type === 3}
                                             onPress={() => setType(3)} size={20}/>
                            </View>
                            <DefaultButton text={"Создать событие"} color={"white"} onClick={createEvent}/>
                        </View>
                    </>
                    : <Text className="">{message}</Text>
            }
        </View>
    );
}