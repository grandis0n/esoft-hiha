import {AgentModel} from "../models/AgentModel.js";
import {ApiError} from "../exceptions/ApiError.js";
import {SuggestionModel} from "../models/SuggestionModel.js";
import {ValidationError} from "../exceptions/ValidationError.js";
import {ClientModel} from "../models/ClientModel.js";
import {RealtyModel} from "../models/RealtyModel.js";
import {DemandModel} from "../models/DemandModel.js";


export class DemandService {

    static async get(filterDTO) {
        try {
            let demand = []
            let queryCheck = false
            if (filterDTO.client_id && filterDTO.agent_id) {
                throw ValidationError.agentAndClientTogether()
            }
            if (filterDTO.client_id) {
                demand = await DemandModel.findAll({where: {client_id: filterDTO.client_id}})
                queryCheck = true
            }
            if (filterDTO.agent_id) {
                demand = await DemandModel.findAll({where: {client_id: filterDTO.client_id}})
                queryCheck = true
            }
            if (demand.length === 0 && !queryCheck) {
                demand = await DemandModel.findAll()
            }
            return {
                msg: 'success',
                data: [...demand]
            }
        } catch (e) {
            console.log(e)
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async create(demandDTO) {
        try {
            const demand = await AgentModel.findOne({where: {id: demandDTO.agent_id}})
            if (!demand) {
                throw ApiError.badRequest(`Риелтора с id = ${demandDTO.agent_id} не существует`)
            }
            const client = await ClientModel.findOne({where: {id: demandDTO.client_id}})
            if (!client) {
                throw ApiError.badRequest(`Клиента с id = ${demandDTO.client_id} не существует`)
            }
            const realty = await RealtyModel.findOne({where: {id: demandDTO.type_id}})
            if (!realty) {
                throw ApiError.badRequest(`Типа недвижимости с id = ${demandDTO.type_id} не существует`)
            }
            let newDemand = []
            switch (demandDTO.type_id) {
                case 1: {
                    newDemand = await DemandModel.create({
                        address_city: demandDTO.address_city,
                        address_street: demandDTO.address_street,
                        address_house_number: demandDTO.address_house_number,
                        address_apartment_number: demandDTO.address_apartment_number,
                        min_price: demandDTO.min_price,
                        max_price: demandDTO.max_price,
                        agent_id: demandDTO.agent_id,
                        client_id: demandDTO.client_id,
                        type_id: demandDTO.type_id,
                        min_area: demandDTO.min_area,
                        max_area: demandDTO.max_area
                    })
                    break
                }
                case 2: {
                    newDemand = await DemandModel.create({
                        address_city: demandDTO.address_city,
                        address_street: demandDTO.address_street,
                        address_house_number: demandDTO.address_house_number,
                        address_apartment_number: demandDTO.address_apartment_number,
                        min_price: demandDTO.min_price,
                        max_price: demandDTO.max_price,
                        agent_id: demandDTO.agent_id,
                        client_id: demandDTO.client_id,
                        type_id: demandDTO.type_id,
                        min_area: demandDTO.min_area,
                        max_area: demandDTO.max_area,
                        min_total_rooms: demandDTO.min_total_rooms,
                        max_total_rooms: demandDTO.max_total_rooms,
                        min_total_floors: demandDTO.min_total_floors,
                        max_total_floors: demandDTO.max_total_floors,
                    })
                    break
                }
                case 3: {
                    newDemand = await DemandModel.create({
                        address_city: demandDTO.address_city,
                        address_street: demandDTO.address_street,
                        address_house_number: demandDTO.address_house_number,
                        address_apartment_number: demandDTO.address_apartment_number,
                        min_price: demandDTO.min_price,
                        max_price: demandDTO.max_price,
                        agent_id: demandDTO.agent_id,
                        client_id: demandDTO.client_id,
                        type_id: demandDTO.type_id,
                        min_area: demandDTO.min_area,
                        max_area: demandDTO.max_area,
                        min_total_rooms: demandDTO.min_total_rooms,
                        max_total_rooms: demandDTO.max_total_rooms,
                        min_floor: demandDTO.min_floor,
                        max_floor: demandDTO.max_floor
                    })
                    break
                }
                default: {
                    break
                }
            }
            return {
                msg: 'success',
                data: {...newDemand.dataValues}
            }
        } catch (e) {
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async update(demandDTO) {
        try {
            const oldDemand = await DemandModel.findOne({where: {id: demandDTO.id}})
            if (!oldDemand) {
                throw ApiError.badRequest(`Потребности с id = ${demandDTO.id} не существует`)
            }
            const demand = await AgentModel.findOne({where: {id: demandDTO.agent_id}})
            if (!demand) {
                throw ApiError.badRequest(`Риелтора с id = ${demandDTO.agent_id} не существует`)
            }
            const client = await ClientModel.findOne({where: {id: demandDTO.client_id}})
            if (!client) {
                throw ApiError.badRequest(`Клиента с id = ${demandDTO.client_id} не существует`)
            }
            const realty = await RealtyModel.findOne({where: {id: demandDTO.type_id}})
            if (!realty) {
                throw ApiError.badRequest(`Типа недвижимости с id = ${demandDTO.type_id} не существует`)
            }
            let newDemand = []
            switch (demandDTO.type_id) {
                case 1: {
                    newDemand = await DemandModel.update({
                        address_city: demandDTO.address_city,
                        address_street: demandDTO.address_street,
                        address_house_number: demandDTO.address_house_number,
                        address_apartment_number: demandDTO.address_apartment_number,
                        min_price: demandDTO.min_price,
                        max_price: demandDTO.max_price,
                        agent_id: demandDTO.agent_id,
                        client_id: demandDTO.client_id,
                        type_id: demandDTO.type_id,
                        min_area: demandDTO.min_area,
                        max_area: demandDTO.max_area
                    }, {
                        where: {id: demandDTO.id}
                    })
                    break
                }
                case 2: {
                    newDemand = await DemandModel.update({
                        address_city: demandDTO.address_city,
                        address_street: demandDTO.address_street,
                        address_house_number: demandDTO.address_house_number,
                        address_apartment_number: demandDTO.address_apartment_number,
                        min_price: demandDTO.min_price,
                        max_price: demandDTO.max_price,
                        agent_id: demandDTO.agent_id,
                        client_id: demandDTO.client_id,
                        type_id: demandDTO.type_id,
                        min_area: demandDTO.min_area,
                        max_area: demandDTO.max_area,
                        min_total_rooms: demandDTO.min_total_rooms,
                        max_total_rooms: demandDTO.max_total_rooms,
                        min_total_floors: demandDTO.min_total_floors,
                        max_total_floors: demandDTO.max_total_floors,
                    }, {
                        where: {id: demandDTO.id}
                    })
                    break
                }
                case 3: {
                    newDemand = await DemandModel.update({
                        address_city: demandDTO.address_city,
                        address_street: demandDTO.address_street,
                        address_house_number: demandDTO.address_house_number,
                        address_apartment_number: demandDTO.address_apartment_number,
                        min_price: demandDTO.min_price,
                        max_price: demandDTO.max_price,
                        agent_id: demandDTO.agent_id,
                        client_id: demandDTO.client_id,
                        type_id: demandDTO.type_id,
                        min_area: demandDTO.min_area,
                        max_area: demandDTO.max_area,
                        min_total_rooms: demandDTO.min_total_rooms,
                        max_total_rooms: demandDTO.max_total_rooms,
                        min_floor: demandDTO.min_floor,
                        max_floor: demandDTO.max_floor
                    }, {
                        where: {id: demandDTO.id}
                    })
                    break
                }
                default: {
                    break
                }
            }
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
            const demand = await DemandModel.findOne({where: {id}})
            if (!demand) {
                throw ApiError.badRequest(`Потребности с id = ${id} не существует`)
            }
            await DemandModel.destroy({where: {id}})
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