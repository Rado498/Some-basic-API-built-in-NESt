import { DataSource, DataSourceOptions } from "typeorm";

export const databaseProviders = [
  {
    provide: " Dynamic_Module",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "shop",
        entities: ["dist//**/**.entity{.ts,.js}"],
        bigNumberStrings: false,
        logging: true,
        synchronize: true

      });

      return dataSource.initialize();
    }
  }
];