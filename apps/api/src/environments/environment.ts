import { databaseConfigurationFactory } from './database/database';

export const environment = {
  production: false,
  database: databaseConfigurationFactory,
};
