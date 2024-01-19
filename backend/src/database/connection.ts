import { DataSource } from "typeorm"
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const connectionOptions: SqliteConnectionOptions = {
  type: "sqlite",
  database: "src/database/database.sqlite",
  entities: ["src/core/entitys/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  synchronize: true,
  logging: false,
}

const AppDataSource = new DataSource(connectionOptions);

export default AppDataSource;