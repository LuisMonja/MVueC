import { DataSource } from "typeorm";
import { join } from "path";


export default new DataSource({
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: "root",
    password: "indecifrable",
    database: "db_test",
    entities: [ join(__dirname, 'models','**.{js,ts}') ],
    migrations: [ join(__dirname, 'migrations','**.{js,ts}') ],
    logging: true,
    migrationsRun: true,
})