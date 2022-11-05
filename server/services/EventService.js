import {AgentModel} from "../models/AgentModel.js";
import {ApiError} from "../exceptions/ApiError.js";
import {EventModel} from "../models/EventModel.js";


export class EventService {

    static async get(searchDTO) {
        try {
            console.log(searchDTO)
            const events = await EventModel.findAll({where: {agent_id: searchDTO.agent_id}})
            const resEvents = []
            for (let i = 0; i < events.length; i++) {
                let event = events[i].dataValues
                let date = event.datetime.toString().split(' ')
                date = date[0] + date[1] + date[2] + date[3]
                let today = searchDTO.today.toString().split(' ')
                today = today[0] + today[1] + today[2] + today[3]
                if (today === date) {
                    resEvents.push({...event})
                }
            }
            return {
                msg: 'success',
                data: [...resEvents]
            }
        } catch (e) {
            console.log(e)
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async create(eventDTO) {
        try {
            const agent = await AgentModel.findOne({where: {id: eventDTO.agent_id}})
            if (!agent) {
                throw ApiError.badRequest(`Риелтора с id = ${eventDTO.agent_id} не существует`)
            }
            const newEvent = await EventModel.create({...eventDTO})
            return {
                msg: 'success',
                data: {...newEvent.dataValues}
            }
        } catch (e) {
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async delete(id) {
        try {
            const event = await EventModel.findOne({where: {id}})
            if (!event) {
                throw ApiError.badRequest(`События с id = ${id} не существует`)
            }
            await EventModel.destroy({where: {id}})
            return {
                msg: 'success',
            }
        } catch (e) {
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

}