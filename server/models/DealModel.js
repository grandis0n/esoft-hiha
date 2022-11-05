import {database} from "../database/database.js";
import {DataTypes} from "sequelize";

export const DealModel = database.define("deal", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    suggestion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 1
    },
    demand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 1
    },
}, {
    timestamps: false,
    schema: 'public'
})
