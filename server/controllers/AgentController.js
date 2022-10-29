import {AgentService} from "../services/AgentService.js";
import {validationResult} from "express-validator";
import {ApiError} from "../exceptions/ApiError.js";

export class AgentController {
    static async get(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка валидации', errors.array()))
            }
            const searchDTO = {
                first_name: req.body.first_name ? req.body.first_name : null,
                middle_name: req.body.middle_name ? req.body.middle_name : null,
                last_name: req.body.last_name ? req.body.last_name : null
            }
            const resData = await AgentService.get(searchDTO)
            return res.json(resData)
        } catch (e) {
            return next(e)
        }
    }

    static async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка валидации', errors.array()))
            }
            const agentDTO = {
                first_name: req.body.first_name,
                middle_name: req.body.middle_name,
                last_name: req.body.last_name,
                deal_share: req.body.deal_share ? req.body.deal_share : null
            }
            const resData = await AgentService.create(agentDTO)
            if (resData.msg === 'bad') {
                return next(resData.errors)
            }
            return res.json(resData)
        } catch (e) {
            return next(e)
        }
    }

    static async update(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
            }
            const agentDTO = {
                id: req.params.id,
                first_name: req.body.first_name,
                middle_name: req.body.middle_name,
                last_name: req.body.last_name,
                deal_share: req.body.deal_share ? req.body.deal_share : null
            }
            const resData = await AgentService.update(agentDTO)
            if (resData.msg === 'bad') {
                return next(resData.errors)
            }
            return res.json(resData)
        } catch (e) {
            return next(e)
        }
    }

    static async delete(req, res, next) {
        try {
            const id = req.params.id
            const resData = await AgentService.delete(id)
            if (resData.msg === 'bad') {
                return next(resData.errors)
            }
            return res.json(resData)
        } catch (e) {
            return next(e)
        }
    }
}