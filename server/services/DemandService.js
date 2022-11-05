import {AgentModel} from "../models/AgentModel.js";
import {ApiError} from "../exceptions/ApiError.js";
import {ValidationError} from "../exceptions/ValidationError.js";
import {ClientModel} from "../models/ClientModel.js";
import {RealtyModel} from "../models/RealtyModel.js";
import {DemandModel} from "../models/DemandModel.js";
import {SuggestionModel} from "../models/SuggestionModel.js";
import {DealModel} from "../models/DealModel.js";


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
            const deal = await DealModel.findOne({where: {demand_id: id}})
            if (deal) {
                throw ApiError.badRequest(`Потребность с id = ${id} связана со сделкой`)
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

    static async searchForSuggestion(suggestion_id) {
        try {
            let suggestion = (await SuggestionModel.findOne({where: {id: suggestion_id}}))
            if (!suggestion) {
                throw ApiError.badRequest(`Предложения с id = ${suggestion_id} не существует`)
            }
            suggestion = {...suggestion.dataValues}
            if (suggestion.served) {
                throw ApiError.badRequest(`Предложение с id = ${suggestion_id} уже недоступно`)
            }
            const realty = (await RealtyModel.findOne({where: {id: suggestion.realty_id}})).dataValues
            suggestion = {...suggestion, realty: {...realty}}
            const demandsAll = (await DemandModel.findAll())
            const searchedDemands = []
            for (let index = 0; index < demandsAll.length; index++) {
                let demand = {...(demandsAll[index].dataValues)}
                if (demand.served) {
                    continue
                }
                if (demand.type_id !== suggestion.realty.type_id) {
                    continue
                }
                // check address
                if (suggestion.realty.address_city) {
                    if (demand.address_city && demand.address_city !== suggestion.realty.address_city) {
                        continue
                    }
                }
                if (suggestion.realty.address_street) {
                    if (demand.address_street && demand.address_street !== suggestion.realty.address_street) {
                        continue
                    }
                }
                if (suggestion.realty.address_house_number) {

                    if (demand.address_house_number &&
                        demand.address_house_number !== suggestion.realty.address_house_number) {
                        continue
                    }
                }
                if (suggestion.realty.address_apartment_number) {
                    if (demand.address_apartment_number &&
                        demand.address_apartment_number !== suggestion.realty.address_apartment_number) {
                        continue
                    }
                }
                // check floor
                if (suggestion.realty.floor) {
                    if (demand.min_floor && demand.max_floor) {
                        if (demand.min_floor > suggestion.realty.floor || demand.max_floor < suggestion.realty.floor) {
                            continue
                        }
                    } else if (demand.min_floor) {
                        if (demand.min_floor > suggestion.realty.floor) {
                            continue
                        }
                    } else if (demand.max_floor) {
                        if (demand.max_floor < suggestion.realty.floor) {
                            continue
                        }
                    }
                }
                // check total_rooms
                if (suggestion.realty.total_rooms) {
                    if (demand.min_total_rooms && demand.max_total_rooms) {
                        if (demand.min_total_rooms > suggestion.realty.total_rooms ||
                            demand.max_total_rooms < suggestion.realty.total_rooms) {
                            continue
                        }
                    } else if (demand.min_total_rooms) {
                        if (demand.min_total_rooms > suggestion.realty.total_rooms) {
                            continue
                        }
                    } else if (demand.max_total_rooms) {
                        if (demand.max_total_rooms < suggestion.realty.total_rooms) {
                            continue
                        }
                    }
                }
                // check total_floors
                if (suggestion.realty.total_floors) {
                    if (demand.min_total_floors && demand.max_total_floors) {
                        if (demand.min_total_floors > suggestion.realty.total_floors ||
                            demand.max_total_floors < suggestion.realty.total_floors) {
                            continue
                        }
                    } else if (demand.min_total_floors) {
                        if (demand.min_total_floors > suggestion.realty.total_floors) {
                            continue
                        }
                    } else if (demand.max_total_floors) {
                        if (demand.max_total_floors < suggestion.realty.total_floors) {
                            continue
                        }
                    }
                }
                // check area
                if (suggestion.realty.area) {
                    if (demand.min_area && demand.max_area) {
                        if (demand.min_area > suggestion.realty.area ||
                            demand.max_area < suggestion.realty.area) {
                            continue
                        }
                    } else if (demand.min_area) {
                        if (demand.min_area > suggestion.realty.area) {
                            continue
                        }
                    } else if (demand.max_area) {
                        if (demand.max_area < suggestion.realty.area) {
                            continue
                        }
                    }
                }
                // check price
                if (suggestion.realty.price) {
                    if (demand.min_price && demand.max_price) {
                        if (demand.min_price > suggestion.price ||
                            demand.max_price < suggestion.price) {
                            continue
                        }
                    } else if (demand.min_price) {
                        if (demand.min_price > suggestion.price) {
                            continue
                        }
                    } else if (demand.max_price) {
                        if (demand.max_price < suggestion.price) {
                            continue
                        }
                    }
                }
                searchedDemands.push({...demand})
            }
            return {
                msg: 'success',
                data: [...searchedDemands]
            }
        } catch (e) {
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

}