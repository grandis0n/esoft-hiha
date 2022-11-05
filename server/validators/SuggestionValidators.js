import {body} from "express-validator";

export const SuggestionValidatorsGet = [
    body('client_id', 'Плохой формат идентификатора клиента').optional().isInt({min: 1}),
    body('agent_id', 'Плохой формат идентификатора риелтора').optional().isInt({min: 1}),
]

export const SuggestionValidatorsCreate = [
    body('client_id', 'Плохой формат идентификатора клиента').isInt({min: 1}),
    body('agent_id', 'Плохой формат идентификатора риелтора').isInt({min: 1}),
    body('realty_id', 'Плохой формат идентификатора недвижимости').isInt({min: 1}),
    body('price', 'Плохой формат цены').isInt({min: 1}),
]

export const SuggestionValidatorsUpdate = [
    body('client_id', 'Плохой формат идентификатора клиента').optional().isInt({min: 1}),
    body('agent_id', 'Плохой формат идентификатора риелтора').optional().isInt({min: 1}),
    body('realty_id', 'Плохой формат идентификатора недвижимости').optional().isInt({min: 1}),
    body('price', 'Плохой формат цены').optional().isInt({min: 1}),
]

export const SuggestionValidatorsSearchForDemand = [
    body('demand_id', 'Плохой формат идентификатора потребности').isInt({min: 1}),
]


