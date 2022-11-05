import {AgentModel} from "../models/AgentModel.js";
import {ApiError} from "../exceptions/ApiError.js";
import {SuggestionModel} from "../models/SuggestionModel.js";
import {ValidationError} from "../exceptions/ValidationError.js";
import {ClientModel} from "../models/ClientModel.js";
import {RealtyModel} from "../models/RealtyModel.js";
import {DemandModel} from "../models/DemandModel.js";
import {DealModel} from "../models/DealModel.js";


export class SuggestionService {

    static async get(filterDTO) {
        try {
            let suggestions = []
            if (filterDTO.client_id && filterDTO.agent_id) {
                throw ValidationError.agentAndClientTogether()
            }
            if (filterDTO.client_id) {
                suggestions = await SuggestionModel.findAll({where: {client_id: filterDTO.client_id}})
            }
            if (filterDTO.agent_id) {
                suggestions = await SuggestionModel.findAll({where: {client_id: filterDTO.client_id}})
            }
            if (suggestions.length === 0) {
                suggestions = await SuggestionModel.findAll()
            }
            return {
                msg: 'success',
                data: [...suggestions]
            }
        } catch (e) {
            console.log(e)
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async create(suggestionDTO) {
        try {
            const agent = await AgentModel.findOne({where: {id: suggestionDTO.agent_id}})
            if (!agent) {
                throw ApiError.badRequest(`Риелтора с id = ${suggestionDTO.agent_id} не существует`)
            }
            const client = await ClientModel.findOne({where: {id: suggestionDTO.client_id}})
            if (!client) {
                throw ApiError.badRequest(`Клиента с id = ${suggestionDTO.client_id} не существует`)
            }
            const realty = await RealtyModel.findOne({where: {id: suggestionDTO.realty_id}})
            if (!realty) {
                throw ApiError.badRequest(`Недвижимости с id = ${suggestionDTO.realty_id} не существует`)
            }
            const newSuggestion = await SuggestionModel.create({...suggestionDTO})
            return {
                msg: 'success',
                data: {...newSuggestion.dataValues}
            }
        } catch (e) {
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async update(suggestionDTO) {
        try {
            const suggestion = await SuggestionModel.findOne({where: {id: suggestionDTO.id}})
            if (!suggestion) {
                throw ApiError.badRequest(`Предложения с id = ${suggestionDTO.id} не существует`)
            }
            const agent = await AgentModel.findOne({where: {id: suggestionDTO.agent_id}})
            if (!agent) {
                throw ApiError.badRequest(`Риелтора с id = ${suggestionDTO.agent_id} не существует`)
            }
            const client = await ClientModel.findOne({where: {id: suggestionDTO.client_id}})
            if (!client) {
                throw ApiError.badRequest(`Клиента с id = ${suggestionDTO.client_id} не существует`)
            }
            const realty = await RealtyModel.findOne({where: {id: suggestionDTO.realty_id}})
            if (!realty) {
                throw ApiError.badRequest(`Недвижимости с id = ${suggestionDTO.realty_id} не существует`)
            }
            await SuggestionModel.update({...suggestionDTO}, {where: {id: suggestionDTO.id}},)
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
            const suggestion = await SuggestionModel.findOne({where: {id}})
            if (!suggestion) {
                throw ApiError.badRequest(`Предложения с id = ${id} не существует`)
            }
            const deal = await DealModel.findOne({where: {suggestion_id: id}})
            if (deal) {
                throw ApiError.badRequest(`Предложение с id = ${id} связано со сделкой`)
            }
            await SuggestionModel.destroy({where: {id}})
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

    static async searchForDemand(demand_id) {
        try {
            let demand = (await DemandModel.findOne({where: {id: demand_id}}))
            if (!demand) {
                throw ApiError.badRequest(`Потребности с id = ${demand_id} не существует`)
            }
            demand = {...demand.dataValues}
            if (demand.served) {
                throw ApiError.badRequest(`Потребность с id = ${demand_id} уже недоступно`)
            }
            const suggestionsAll = (await SuggestionModel.findAll())
            const searchedSuggestions = []
            for (let index = 0; index < suggestionsAll.length; index++) {
                let suggestion = {...(suggestionsAll[index].dataValues)}
                const realty = (await RealtyModel.findOne({where: {id: suggestion.realty_id}})).dataValues
                suggestion = {...suggestion, realty: {...realty}}
                if (suggestion.served) {
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
                searchedSuggestions.push({...suggestion})
            }
            return {
                msg: 'success',
                data: [...searchedSuggestions]
            }
        } catch (e) {
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

}