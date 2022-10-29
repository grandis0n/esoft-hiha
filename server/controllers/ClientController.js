import {validationResult} from "express-validator";
import {ApiError} from "../exceptions/ApiError.js";
import {ClientService} from "../services/ClientService.js";
import {ValidationError} from "../exceptions/ValidationError.js";

export class ClientController {
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
            const resData = await ClientService.get(searchDTO)
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
            if (!req.body.email && !req.body.phone) {
                return next(ValidationError.phoneAndEmailIsNull())
            }
            const clientDTO = {
                first_name: req.body.first_name,
                middle_name: req.body.middle_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
            }
            const resData = await ClientService.create(clientDTO)
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
            const clientDTO = {
                id: req.params.id,
                first_name: req.body.first_name,
                middle_name: req.body.middle_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
            }
            const resData = await ClientService.update(clientDTO)
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
            const resData = await ClientService.delete(id)
            if (resData.msg === 'bad') {
                return next(resData.errors)
            }
            return res.json(resData)
        } catch (e) {
            return next(e)
        }
    }
}