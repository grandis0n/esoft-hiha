import {ApiError} from "../exceptions/ApiError.js"
import {ValidationError} from "../exceptions/ValidationError.js";

export const errorMiddlewares = (err, req, res, next) => {
    if (err instanceof ApiError || err instanceof ValidationError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    console.log(err)
    return res.status(500).json({message: 'Непредвиденная ошибка'})
};