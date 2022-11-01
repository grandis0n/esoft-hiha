import {database} from "../database/database.js";
import {DataTypes} from "sequelize";
import {RealtyModel} from "./RealtyModel.js";
import {DemandModel} from "./DemandModel.js";

export const TypeRealtyModel = database.define("type_realty", {
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

TypeRealtyModel.hasMany(DemandModel, {foreignKey: 'type_id'})
TypeRealtyModel.hasMany(RealtyModel, {foreignKey: 'type_id'})
