import { DataSource } from "typeorm";
import { fileURLToPath } from "url";

export default new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [ "./model/**.{js,ts}" ],
    logging: process.env.NODE_ENV === "development",
    synchronize: true,
    dropSchema: false
})