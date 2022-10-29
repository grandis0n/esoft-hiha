import {database} from "../database/database.js";
import {DataTypes} from "sequelize";

export const AgentModel = database.define("agents", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middle_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deal_share: {
        type: DataTypes.FLOAT,
        allowNull: true,
        default: null
    },
}, {
    timestamps: false,
    schema: 'public'
})