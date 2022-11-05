import {database} from "../database/database.js";
import {DataTypes} from "sequelize";
import {EventModel} from "./EventModel.js";

export const TypeEventModel = database.define("type_event", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    schema: 'public'
})

TypeEventModel.hasMany(EventModel, {foreignKey: 'type_id'})
