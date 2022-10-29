export class ValidationError extends Error {

    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static phoneAndEmailIsNull() {
        return new ValidationError(400, 'Ошибка при валидации', [{
            msg: "Хотя бы одно поле должно быть заполнено (почта или номер телефона)",
            param: ['email', 'phone'],
            location: "body"
        }])
    }

    static badCoordinates() {
        return new ValidationError(400, 'Ошибка при валидации', [{
            msg: "Неправильное значение координат района",
            param: ['coordinates'],
            location: "body"
        }])
    }
}