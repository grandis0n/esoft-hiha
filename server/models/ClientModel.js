import {database} from "../database/database.js";
import {DataTypes} from "sequelize";
import {SuggestionModel} from "./SuggestionModel.js";

export const ClientModel = database.define("clients", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    last_name: {
        type: DataTypes.STRING,
        default: null,
        allowNull: true
    },
    middle_name: {
        type: DataTypes.STRING,
        default: null,
        allowNull: true
    },
    first_name: {
        type: DataTypes.STRING,
        default: null,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        default: null
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        default: null
    },
}, {
    timestamps: false,
    schema: 'public'
})

ClientModel.hasMany(SuggestionModel, {foreignKey: 'client_id'})