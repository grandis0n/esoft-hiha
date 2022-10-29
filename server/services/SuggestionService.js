import {AgentModel} from "../models/AgentModel.js";
import {ApiError} from "../exceptions/ApiError.js";
import {SuggestionModel} from "../models/SuggestionModel.js";
import {ValidationError} from "../exceptions/ValidationError.js";
import {ClientModel} from "../models/ClientModel.js";
import {RealtyModel} from "../models/RealtyModel.js";


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

}