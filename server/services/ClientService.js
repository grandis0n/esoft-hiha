import {ApiError} from "../exceptions/ApiError.js";

import {ClientModel} from "../models/ClientModel.js";
import {LevenshteinSearchAgentAndClient} from "../utils/LevenshteinSearchAgentAndClient.js";


export class ClientService {

    static async get(searchDTO) {
        try {
            const clients = await ClientModel.findAll()
            console.log(clients)
            if (!searchDTO.first_name && !searchDTO.last_name && !searchDTO.middle_name) {
                return {
                    msg: 'success',
                    data: [...clients]
                }
            }
            const resClients = [...LevenshteinSearchAgentAndClient(clients, searchDTO)]
            return {
                msg: 'success',
                data: [...resClients]
            }
        } catch (e) {
            console.log(e)
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async create(clientDTO) {
        try {
            const newClient = await ClientModel.create({...clientDTO})
            return {
                msg: 'success',
                data: {...newClient.dataValues}
            }
        } catch (e) {
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async update(clientDTO) {
        try {
            const agent = await ClientModel.findOne({where: {id: clientDTO.id}})
            if (!agent) {
                throw ApiError.badRequest(`Клиента с id = ${clientDTO.id} не существует`)
            }
            await ClientModel.update({...clientDTO}, {where: {id: clientDTO.id}},)
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

    static async delete(id) {
        try {
            const client = await ClientModel.findOne({where: {id}})
            if (!client) {
                throw ApiError.badRequest(`Клиента с id = ${id} не существует`)
            }
            await ClientModel.destroy({where: {id}})
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