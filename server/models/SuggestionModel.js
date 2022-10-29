import {database} from "../database/database.js";
import {DataTypes} from "sequelize";

export const SuggestionModel = database.define("suggestion", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    agent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    realty_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        min: 1,
        allowNull: false
    }
}, {
    timestamps: false,
    schema: 'public'
})

