import {config} from "dotenv";
import {Sequelize} from "sequelize";

config()

export const database = new Sequelize({
        database: process.env["DB_NAME"],
        username: process.env["DB_USERNAME"],
        password: process.env["DB_PASSWORD"],
        host: process.env["DB_HOST"],
        port: Number(process.env["DB_PORT"]),
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
    }
);