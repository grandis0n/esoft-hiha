import {body} from "express-validator";

export const DealValidatorsCreate = [
    body('suggestion_id', 'Плохой формат идентификатора предложения').isInt({min: 1}),
    body('demand_id', 'Плохой формат идентификатора потребности').isInt({min: 1}),
]

export const DealValidatorsUpdate = [
    body('suggestion_id', 'Плохой формат идентификатора предложения').optional().isInt({min: 1}),
    body('demand_id', 'Плохой формат идентификатора потребности').optional().isInt({min: 1}),
]
