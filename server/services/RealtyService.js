import {ApiError} from "../exceptions/ApiError.js";
import {RealtyModel} from "../models/RealtyModel.js";
import {LevenshteinSearchRealty} from "../utils/LevenshteinSearchRealty.js";
import {ValidationError} from "../exceptions/ValidationError.js";
import {CheckPointInPolyon} from "../utils/CheckPointInPolyon.js";


export class RealtyService {

    static async get(searchDTO) {
        try {
            let checkCoordinates = true
            if (searchDTO.coordinates) {
                if (searchDTO.coordinates.length > 2) {
                    for (let i = 0; i < searchDTO.coordinates.length; i++) {
                        console.log(searchDTO.coordinates[i])
                        if (Array.isArray(searchDTO.coordinates[i])) {
                            if (searchDTO.coordinates[i].length === 2) {
                                if (!isNaN(parseFloat(searchDTO.coordinates[i][1])) && isFinite(searchDTO.coordinates[i][1])
                                    && !isNaN(parseFloat(searchDTO.coordinates[i][0])) && isFinite(searchDTO.coordinates[i][0])) {
                                    checkCoordinates = true
                                } else {
                                    checkCoordinates = false
                                }
                            } else {
                                checkCoordinates = false
                            }
                        } else {
                            checkCoordinates = false
                        }
                    }
                } else {
                    checkCoordinates = false
                }
            }
            if (!checkCoordinates) {
                throw ValidationError.badCoordinates()
            }
            let arrayRealty
            if (searchDTO.type_id) {
                arrayRealty = await RealtyModel.findAll({where: {type_id: searchDTO.type_id}})
            } else {
                arrayRealty = await RealtyModel.findAll()
            }
            if (!searchDTO.address_house_number && !searchDTO.address_apartment_number && !searchDTO.address_street
                && !searchDTO.address_city) {
                return {
                    msg: 'success',
                    data: [...arrayRealty]
                }
            }
            let resRealty = [...LevenshteinSearchRealty(arrayRealty, searchDTO)]
            if (searchDTO.coordinates) {
                resRealty = [...CheckPointInPolyon(arrayRealty, searchDTO.coordinates)]
            }
            return {
                msg: 'success',
                data: [...resRealty]
            }
        } catch (e) {
            console.log(e)
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async create(realtyDTO) {
        try {
            let realtyObject = {}
            if (realtyDTO.type_id === 1) {
                realtyObject = await RealtyModel.create({
                    type_id: realtyDTO.type_id,
                    area: realtyDTO.type_id,
                    coordinate_longitude: realtyDTO.coordinate_longitude,
                    coordinate_latitude: realtyDTO.coordinate_latitude,
                    address_city: realtyDTO.address_city,
                    address_street: realtyDTO.address_street
                })
            }
            if (realtyDTO.type_id === 2) {
                realtyObject = await RealtyModel.create({
                    type_id: realtyDTO.type_id,
                    area: realtyDTO.type_id,
                    coordinate_longitude: realtyDTO.coordinate_longitude,
                    coordinate_latitude: realtyDTO.coordinate_latitude,
                    address_city: realtyDTO.address_city,
                    address_street: realtyDTO.address_street,
                    address_house_number: realtyDTO.address_house_number,
                    total_floors: realtyDTO.total_floors,
                    total_rooms: realtyDTO.total_rooms
                })
            }
            if (realtyDTO.type_id === 3) {
                realtyObject = await RealtyModel.create({
                    type_id: realtyDTO.type_id,
                    area: realtyDTO.type_id,
                    coordinate_longitude: realtyDTO.coordinate_longitude,
                    coordinate_latitude: realtyDTO.coordinate_latitude,
                    address_city: realtyDTO.address_city,
                    address_street: realtyDTO.address_street,
                    address_house_number: realtyDTO.address_house_number,
                    address_apartment_number: realtyDTO.address_apartment_number,
                    floor: realtyDTO.floor,
                    total_rooms: realtyDTO.total_rooms
                })
            }
            return {
                msg: 'success',
                data: {...realtyObject.dataValues}
            }
        } catch (e) {
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async update(realtyDTO) {
        try {
            const agent = await RealtyModel.findOne({where: {id: realtyDTO.id}})
            if (!agent) {
                throw ApiError.badRequest(`Недвижимости с id = ${realtyDTO.id} не существует`)
            }
            if (realtyDTO.type_id === 1) {
                await RealtyModel.update({
                    type_id: realtyDTO.type_id,
                    area: realtyDTO.type_id,
                    coordinate_longitude: realtyDTO.coordinate_longitude,
                    coordinate_latitude: realtyDTO.coordinate_latitude,
                    address_city: realtyDTO.address_city,
                    address_street: realtyDTO.address_street
                }, {where: {id: realtyDTO.id}})
            }
            if (realtyDTO.type_id === 2) {
                await RealtyModel.update({
                    type_id: realtyDTO.type_id,
                    area: realtyDTO.type_id,
                    coordinate_longitude: realtyDTO.coordinate_longitude,
                    coordinate_latitude: realtyDTO.coordinate_latitude,
                    address_city: realtyDTO.address_city,
                    address_street: realtyDTO.address_street,
                    address_house_number: realtyDTO.address_house_number,
                    total_floors: realtyDTO.total_floors,
                    total_rooms: realtyDTO.total_rooms
                }, {where: {id: realtyDTO.id}})
            }
            if (realtyDTO.type_id === 3) {
                await RealtyModel.update({
                    type_id: realtyDTO.type_id,
                    area: realtyDTO.type_id,
                    coordinate_longitude: realtyDTO.coordinate_longitude,
                    coordinate_latitude: realtyDTO.coordinate_latitude,
                    address_city: realtyDTO.address_city,
                    address_street: realtyDTO.address_street,
                    address_house_number: realtyDTO.address_house_number,
                    address_apartment_number: realtyDTO.address_apartment_number,
                    floor: realtyDTO.floor,
                    total_rooms: realtyDTO.total_rooms
                }, {where: {id: realtyDTO.id}})
            }
            return {
                msg: 'success'
            }
        } catch (e) {
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

    static async delete(id) {
        try {
            const agent = await RealtyModel.findOne({where: {id}})
            if (!agent) {
                throw ApiError.badRequest(`Недвижимости с id = ${id} не существует`)
            }
            await RealtyModel.destroy({where: {id}})
            return {
                msg: 'success',
            }
        } catch (e) {
            return {
                msg: 'bad',
                errors: e
            }
        }
    }

}