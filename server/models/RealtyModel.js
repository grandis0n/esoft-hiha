import {database} from "../database/database.js";
import {DataTypes} from "sequelize";

export const RealtyModel = database.define("realty", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    address_city: {
        type: DataTypes.STRING,
        allowNull: true,
        default: null
    },
    address_street: {
        type: DataTypes.STRING,
        allowNull: true,
        default: null
    },
    address_house_number: {
        type: DataTypes.STRING,
        allowNull: true,
        default: null
    },
    address_apartment_number: {
        type: DataTypes.STRING,
        allowNull: true,
        default: null
    },
    coordinate_latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        default: null,
        max: 90,
        min: -90
    },
    coordinate_longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        default: null,
        max: 180,
        min: -180
    },
    floor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default: null,
    },
    total_rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default: null,
        min: 1
    },
    total_floors: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default: null,
        min: 1
    },
    area: {
        type: DataTypes.FLOAT,
        allowNull: true,
        default: null,
        min: 0
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    schema: 'public'
})

