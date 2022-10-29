import {body} from "express-validator";

export const RealtyValidatorsGet = [
    body('type_id', 'Плохой формат типа объекта').optional().isIn([1, 2, 3]),
    body('address_city', 'Плохой формат города').optional().isString(),
    body('address_street', 'Плохой формат улицы').optional().isString(),
    body('address_house_number', 'Плохой формат номера дома').optional().isString(),
    body('address_apartment_number', 'Плохой формат номера квартиры').optional().isString(),
    body('coordinates', 'Плохой формат координат района').optional().isArray(),
]

export const RealtyValidatorsCreate = [
    body('type_id', 'Плохой формат типа объекта').isIn([1, 2, 3]),
    body('floor', 'Плохой формат номера этажа').optional().isInt(),
    body('area', 'Плохой формат площади').optional().isFloat({
        min: 0
    }),
    body('coordinate_longitude', 'Плохой формат координаты долготы').optional().isFloat({
        min: -180,
        max: 180
    }),
    body('coordinate_longitude', 'Плохой формат координаты широты').optional().isFloat({
        min: -90,
        max: 90
    }),
    body('address_city', 'Плохой формат города').optional().isString(),
    body('address_street', 'Плохой формат улицы').optional().isString(),
    body('address_house_number', 'Плохой формат номера дома').optional().isString(),
    body('address_apartment_number', 'Плохой формат номера квартиры').optional().isString(),
    body('total_rooms', 'Плохой формат количества комнат').optional().isInt({
        min: 1
    }),
    body('total_floors', 'Плохой формат количества этажей').optional().isInt({
        min: 1
    }),
]

export const RealtyValidatorsUpdate = [
    body('type_id', 'Плохой формат типа объекта').isIn([1, 2, 3]),
    body('floor', 'Плохой формат номера этажа').optional().isInt(),
    body('area', 'Плохой формат площади').optional().isFloat({
        min: 0
    }),
    body('coordinate_longitude', 'Плохой формат координаты долготы').optional().isFloat({
        min: -180,
        max: 180
    }),
    body('coordinate_longitude', 'Плохой формат координаты широты').optional().isFloat({
        min: -90,
        max: 90
    }),
    body('address_city', 'Плохой формат города').optional().isString(),
    body('address_street', 'Плохой формат улицы').optional().isString(),
    body('address_house_number', 'Плохой формат номера дома').optional().isString(),
    body('address_apartment_number', 'Плохой формат номера квартиры').optional().isString(),
    body('total_rooms', 'Плохой формат количества комнат').optional().isInt({
        min: 1
    }),
    body('total_floors', 'Плохой формат количества этажей').optional().isInt({
        min: 1
    }),
]
