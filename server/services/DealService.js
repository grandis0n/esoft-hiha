import {AgentModel} from "../models/AgentModel.js";
import {ApiError} from "../exceptions/ApiError.js";
import {DemandModel} from "../models/DemandModel.js";
import {SuggestionModel} from "../models/SuggestionModel.js";
import {DealModel} from "../models/DealModel.js";


export class DealService {

    static async get() {
        try {
            let deals = (await DealModel.findAll())
            let deal
            let temp = [...deals]
            for (let index = 0; index < temp.length; index++) {
                let deal = temp[index]
                deal = {...deal.dataValues}
                let suggestion = (await SuggestionModel.findOne({where: {id: deal.suggestion_id}})).dataValues
                let demand = (await DemandModel.findOne({where: {id: deal.demand_id}})).dataValues
                let suggestion_agent = (await AgentModel.findOne({where: {id: suggestion.agent_id}})).dataValues
                let demand_agent = (await AgentModel.findOne({where: {id: demand.agent_id}})).dataValues
                suggestion = {...suggestion, agent: {...suggestion_agent}}
                demand = {...demand, agent: {...demand_agent}}
                deal = {
                    ...deal,
                    suggestion: suggestion,
                    demand: demand
                }
                let seller_client_amount
                if (deal.demand.type_id === 1) {
                    seller_client_amount = 30000 + (deal.suggestion.price / 100 * 2)
                    deal = {...deal, seller_client_amount: seller_client_amount}
                } else if (deal.demand.type_id === 2) {
                    seller_client_amount = 30000 + (deal.suggestion.price / 100)
                    deal = {...deal, seller_client_amount: seller_client_amount}
                } else if (deal.demand.type_id === 3) {
                    seller_client_amount = 36000 + (deal.suggestion.price / 100)
                    deal = {...deal, seller_client_amount: seller_client_amount}
                }
                let buyer_client_amount = deal.suggestion.price / 100 * 3
                let total_revenue = buyer_client_amount + seller_client_amount
                let buyer_agent_revenue = total_revenue / 100 * (deal.demand.agent.deal_share ? deal.demand.agent.deal_share : 45)
                let seller_agent_revenue = total_revenue / 100 * (deal.suggestion.agent.deal_share ? deal.suggestion.agent.deal_share : 45)
                let company_revenue = total_revenue - buyer_agent_revenue - seller_agent_revenue
                deal = {
                    ...deal,
                    buyer_client_amount: buyer_client_amount,
                    revenue: {
                        buyer_agent: buyer_agent_revenue,
                        seller_agent: seller_agent_revenue,
                        company: company_revenue
                    }
                }
                temp[index] = {...deal}
            }
            deals = [...temp]
            return {
                msg: 'success',
                data: [...deals]
            }
        } catch (e) {
            console.log(e)
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async create(dealDTO) {
        try {
            const suggestion = await SuggestionModel.findOne({where: {id: dealDTO.suggestion_id}})
            if (!suggestion) {
                throw ApiError.badRequest(`Предложения с id = ${dealDTO.suggestion_id} не существует`)
            }
            if (suggestion.served) {
                throw ApiError.badRequest(`Предложение с id = ${dealDTO.suggestion_id} уже недоступно`)
            }
            const demand = await DemandModel.findOne({where: {id: dealDTO.demand_id}})
            if (!demand) {
                throw ApiError.badRequest(`Потребности с id = ${dealDTO.demand_id} не существует`)
            }
            if (demand.served) {
                throw ApiError.badRequest(`Потребность с id = ${dealDTO.demand_id} уже недоступно`)
            }
            const newDeal = await DealModel.create({...dealDTO})
            await SuggestionModel.update({served: true},
                {
                    where: {
                        id: dealDTO.suggestion_id
                    }
                }
            )
            await DemandModel.update({served: true},
                {
                    where: {
                        id: dealDTO.demand_id
                    }
                }
            )
            return {
                msg: 'success',
                data: {...newDeal.dataValues}
            }
        } catch (e) {
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async update(dealDTO) {
        try {
            let deal = (await DealModel.findOne({where: {id: dealDTO.id}}))
            if (!deal) {
                throw ApiError.badRequest(`Сделки с id = ${dealDTO.id} не существует`)
            }
            deal = {...deal.dataValues}
            if (dealDTO.suggestion_id) {
                const suggestion = await SuggestionModel.findOne({where: {id: dealDTO.suggestion_id}})
                if (!suggestion) {
                    throw ApiError.badRequest(`Предложения с id = ${dealDTO.suggestion_id} не существует`)
                }
                if (suggestion.served && deal.suggestion_id !== dealDTO.suggestion_id) {
                    throw ApiError.badRequest(`Предложение с id = ${dealDTO.suggestion_id} уже недоступно`)
                }
            }
            if (dealDTO.demand_id) {
                const demand = await DemandModel.findOne({where: {id: dealDTO.demand_id}})
                if (!demand) {
                    throw ApiError.badRequest(`Потребности с id = ${dealDTO.demand_id} не существует`)
                }
                if (demand.served && deal.demand_id !== dealDTO.demand_id) {
                    throw ApiError.badRequest(`Потребность с id = ${dealDTO.demand_id} уже недоступно`)
                }
            }
            await DealModel.update({...dealDTO}, {where: {id: dealDTO.id}})
            if (dealDTO.suggestion_id) {
                await SuggestionModel.update({served: true},
                    {
                        where: {
                            id: dealDTO.suggestion_id
                        }
                    }
                )
                await SuggestionModel.update({served: false},
                    {
                        where: {
                            id: deal.suggestion_id
                        }
                    }
                )
            }
            if (dealDTO.demand_id) {
                await DemandModel.update({served: true},
                    {
                        where: {
                            id: dealDTO.demand_id
                        }
                    }
                )
                await DemandModel.update({served: false},
                    {
                        where: {
                            id: deal.demand_id
                        }
                    }
                )
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
            const deal = await DealModel.findOne({where: {id}})
            if (!deal) {
                throw ApiError.badRequest(`Сделки с id = ${id} не существует`)
            }
            await DemandModel.update({served: false},
                {
                    where: {
                        id: deal.demand_id
                    }
                }
            )
            await SuggestionModel.update({served: false},
                {
                    where: {
                        id: deal.suggestion_id
                    }
                }
            )
            await DealModel.destroy({where: {id}})
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