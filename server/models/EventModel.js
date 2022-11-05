import {database} from "../database/database.js";
import {DataTypes} from "sequelize";

export const EventModel = database.define("event", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    agent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    datetime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    schema: 'public'
})

