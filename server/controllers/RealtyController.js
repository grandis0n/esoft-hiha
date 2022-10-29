import {validationResult} from "express-validator";
import {ApiError} from "../exceptions/ApiError.js";
import {RealtyService} from "../services/RealtyService.js";

export class RealtyController {
    static async get(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка валидации', errors.array()))
            }
            const filterDTO = {...req.body}
            const resData = await RealtyService.get(filterDTO)
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
            const realtyDTO = {...req.body}
            const resData = await RealtyService.create(realtyDTO)
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
            const realtyDTO = {...req.body, id: req.params.id}
            const resData = await RealtyService.update(realtyDTO)
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
            const resData = await RealtyService.delete(id)
            if (resData.msg === 'bad') {
                return next(resData.errors)
            }
            return res.json(resData)
        } catch (e) {
            return next(e)
        }
    }
}