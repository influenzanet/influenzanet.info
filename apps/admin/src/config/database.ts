import { DataSource, DataSourceOptions } from 'typeorm';
import { Platform } from "@models/Platform";
import { Country } from "@models/Country";
import { Partner } from "@models/Partner";
import { Publication } from "@models/Publication";
import { News } from "@models/News";
import { Tag } from "@models/Tag";


export const databaseConfiguration: DataSourceOptions = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  extra: {
    charset: "utf8mb4_unicode_ci",
  },
  entities: [
    Platform,
    Country,
    Partner,
    Publication,
    News,
    Tag
  ],
  synchronize: false
};
