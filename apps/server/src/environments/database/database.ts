import {Platform} from "@models/Platform";
import {Country} from "@models/Country";
import {Partner} from "@models/Partner";
import {Publication} from "@models/Publication";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const databaseConfigurationFactory = (configService: ConfigService): TypeOrmModuleOptions => {
  return <TypeOrmModuleOptions>{
    type: "mysql",
    host: configService.get('MYSQL_HOST', 'mysql'),
    port: configService.get('MYSQL_PORT', 3306),
    database: configService.get('MYSQL_DATABASE', 'influenzanet'),
    username: configService.get('MYSQL_USER',"user"),
    password: configService.get('MYSQL_PASSWORD', "password"),
    extra: {
      charset: "utf8mb4_unicode_ci",
    },
    entities: [
      Platform,
      Country,
      Partner,
      Publication
    ],
    autoLoadEntities: false,
    synchronize: false,
  }
}
