"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
exports.default = {
    database: process.env.POSTGRES_DB,
    entities: [
        "dist/app/entity/*{.ts,.js}",
    ],
    extra: { max: 5, min: 2 },
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    synchronize: false,
    logging: true,
    type: "postgres",
    username: process.env.POSTGRES_USER,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    migrations: ["dist/migrations/*.js"],
    cli: {
        migrationsDir: "src/migrations"
    }
};
