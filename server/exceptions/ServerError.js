import {ApiError} from "./ApiError.js";

export class ServerError extends Error {

    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static serviceUnavailable() {
        return new ApiError(503, "Нет соединения с базой данных")
    }
}