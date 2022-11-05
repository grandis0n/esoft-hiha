import {validationResult} from "express-validator";
import {ApiError} from "../exceptions/ApiError.js";
import {DealService} from "../services/DealService.js";

export class DealController {
    static async get(req, res, next) {
        try {
            const resData = await DealService.get()
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
            const dealDTO = {...req.body}
            const resData = await DealService.create(dealDTO)
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
            const dealDTO = {...req.body, id: req.params.id}
            const resData = await DealService.update(dealDTO)
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
            const resData = await DealService.delete(id)
            if (resData.msg === 'bad') {
                return next(resData.errors)
            }
            return res.json(resData)
        } catch (e) {
            return next(e)
        }
    }
}