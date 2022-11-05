import {body} from "express-validator";

export const DemandValidatorsGet = [
    body('client_id', 'Плохой формат идентификатора клиента').optional().isInt({min: 1}),
    body('agent_id', 'Плохой формат идентификатора риелтора').optional().isInt({min: 1}),
]

export const DemandValidatorsCreate = [
    body('type_id', 'Плохой формат типа объекта').isIn([1, 2, 3]),
    body('client_id', 'Плохой формат идентификатора клиента').isInt({min: 1}),
    body('agent_id', 'Плохой формат идентификатора риелтора').isInt({min: 1}),
    body('min_price', 'Плохой формат минимальной цены').optional().isInt({min: 1}),
    body('max_price', 'Плохой формат максимальной цены').optional().isInt({min: 1}),
    body('min_floor', 'Плохой формат минимального номера этажа').optional().isInt(),
    body('max_floor', 'Плохой формат максимального номера этажа').optional().isInt(),
    body('min_area', 'Плохой формат минимальной площади').optional().isFloat({
        min: 0
    }),
    body('max_area', 'Плохой формат максимальной площади').optional().isFloat({
        min: 0
    }),
    body('address_city', 'Плохой формат города').optional().isString(),
    body('address_street', 'Плохой формат улицы').optional().isString(),
    body('address_house_number', 'Плохой формат номера дома').optional().isString(),
    body('address_apartment_number', 'Плохой формат номера квартиры').optional().isString(),
    body('min_total_rooms', 'Плохой формат минимального количества комнат').optional().isInt({
        min: 1
    }),
    body('max_total_rooms', 'Плохой формат максимального количества комнат').optional().isInt({
        min: 1
    }),
    body('min_total_floors', 'Плохой формат минимального количества этажей').optional().isInt({
        min: 1
    }),
    body('max_total_floors', 'Плохой формат максимального количества этажей').optional().isInt({
        min: 1
    }),
]

export const DemandValidatorsUpdate = [
    body('type_id', 'Плохой формат типа объекта').isIn([1, 2, 3]),
    body('client_id', 'Плохой формат идентификатора клиента').optional().isInt({min: 1}),
    body('agent_id', 'Плохой формат идентификатора риелтора').optional().isInt({min: 1}),
    body('min_price', 'Плохой формат минимальной цены').optional().isInt({min: 1}),
    body('max_price', 'Плохой формат максимальной цены').optional().isInt({min: 1}),
    body('min_floor', 'Плохой формат минимального номера этажа').optional().isInt(),
    body('max_floor', 'Плохой формат максимального номера этажа').optional().isInt(),
    body('min_area', 'Плохой формат минимальной площади').optional().isFloat({
        min: 0
    }),
    body('max_area', 'Плохой формат максимальной площади').optional().isFloat({
        min: 0
    }),
    body('address_city', 'Плохой формат города').optional().isString(),
    body('address_street', 'Плохой формат улицы').optional().isString(),
    body('address_house_number', 'Плохой формат номера дома').optional().isString(),
    body('address_apartment_number', 'Плохой формат номера квартиры').optional().isString(),
    body('min_total_rooms', 'Плохой формат минимального количества комнат').optional().isInt({
        min: 1
    }),
    body('max_total_rooms', 'Плохой формат максимального количества комнат').optional().isInt({
        min: 1
    }),
    body('min_total_floors', 'Плохой формат минимального количества этажей').optional().isInt({
        min: 1
    }),
    body('max_total_floors', 'Плохой формат максимального количества этажей').optional().isInt({
        min: 1
    }),
]

export const DemandValidatorsSearchForSuggestion = [
    body('suggestion_id', 'Плохой формат идентификатора предложения').isInt({min: 1}),
]