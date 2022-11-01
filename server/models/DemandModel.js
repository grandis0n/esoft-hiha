import {database} from "../database/database.js";
import {DataTypes} from "sequelize";

export const DemandModel = database.define("demand", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    served: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    address_city: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    address_street: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    address_house_number: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    address_apartment_number: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    min_floor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    max_floor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    min_total_rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        min: 1
    },
    max_total_rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        min: 1
    },
    min_total_floors: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        min: 1
    },
    max_total_floors: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        min: 1
    },
    min_area: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
        min: 0
    },
    max_area: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
        min: 0
    },
    min_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        min: 1
    },
    max_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        min: 1
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    agent_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false,
    schema: 'public'
})