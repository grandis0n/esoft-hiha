import {database} from "../database/database.js";
import {DataTypes} from "sequelize";
import {SuggestionModel} from "./SuggestionModel.js";
import {DemandModel} from "./DemandModel.js";

export const ClientModel = database.define("clients", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    last_name: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    middle_name: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    first_name: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
}, {
    timestamps: false,
    schema: 'public'
})

ClientModel.hasMany(SuggestionModel, {foreignKey: 'client_id'})
ClientModel.hasMany(DemandModel, {foreignKey: 'client_id'})