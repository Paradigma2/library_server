import { ConnectionOptions } from 'typeorm';

export const ormConfig: ConnectionOptions = {
    cli: {
      migrationsDir: "src/migrations",
    },
    database: 'library-dev',
    entities: [
        __dirname + '/entities/*{.ts,.js}',
    ],
    host: 'localhost',
    password: 'spothopper',
    port: 5432,
    synchronize: true,
    type: 'postgres',
    username: 'spothopper_development',
};
