import { databaseConfigurationFactory } from "./database/database";

export const environment = {
  production: true,
  database: databaseConfigurationFactory
};
