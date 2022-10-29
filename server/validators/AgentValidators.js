import {body} from "express-validator";

export const AgentValidatorsGet = [
    body('first_name', 'Плохой формат имени').isString(),
    body('middle_name', 'Плохой формат отчества').isString(),
    body('last_name', 'Плохой формат фамилии').isString()
]

export const AgentValidatorsCreate = [
    body('deal_share', 'Доля компенсации должна быть в формате 80.0 от 0 до 100').optional().isFloat({
        min: 0,
        max: 100
    }),
    body('first_name', 'Плохой формат имени').isString(),
    body('middle_name', 'Плохой формат отчества').isString(),
    body('last_name', 'Плохой формат фамилии').isString()
]

export const AgentValidatorsUpdate = [
    body('deal_share', 'Доля компенсации должна быть в формате 80.0 от 0 до 100').optional().isFloat({
        min: 0,
        max: 100
    }),
    body('first_name', 'Плохой формат имени').optional().isString(),
    body('middle_name', 'Плохой формат отчества').optional().isString(),
    body('last_name', 'Плохой формат фамилии').optional().isString()
]
