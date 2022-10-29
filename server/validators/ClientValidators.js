import {body} from "express-validator";

export const ClientValidatorsGet = [
    body('first_name', 'Плохой формат имени').isString(),
    body('middle_name', 'Плохой формат отчества').isString(),
    body('last_name', 'Плохой формат фамилии').isString()
]

export const ClientValidatorsCreate = [
    body('first_name', 'Плохой формат имени').optional().isString(),
    body('middle_name', 'Плохой формат отчества').optional().isString(),
    body('last_name', 'Плохой формат фамилии').optional().isString(),
    body('phone', 'Плохой формат телефона').optional().isString(),
    body('email', 'Плохой формат почты').optional().isEmail()
]

export const ClientValidatorsUpdate = [
    body('first_name', 'Плохой формат имени').optional().isString(),
    body('middle_name', 'Плохой формат отчества').optional().isString(),
    body('last_name', 'Плохой формат фамилии').optional().isString(),
    body('phone', 'Плохой формат телефона').optional().isString(),
    body('email', 'Плохой формат почты').optional().isEmail()
]
