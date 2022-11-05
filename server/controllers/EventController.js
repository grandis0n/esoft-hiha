import {validationResult} from "express-validator";
import {ApiError} from "../exceptions/ApiError.js";
import {EventService} from "../services/EventService.js";
import {UTC_TIME} from "../index.js";

export class EventController {
    static async get(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка валидации', errors.array()))
            }
            let today = new Date()
            today.setTime(today.getTime() + UTC_TIME)
            const searchDTO = {today: today, agent_id: req.body.agent_id}
            const resData = await EventService.get(searchDTO)
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
            const eventDTO = {...req.body}
            const resData = await EventService.create(eventDTO)
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
            const resData = await EventService.delete(id)
            if (resData.msg === 'bad') {
                return next(resData.errors)
            }
            return res.json(resData)
        } catch (e) {
            return next(e)
        }
    }
}