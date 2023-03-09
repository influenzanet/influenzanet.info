import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AdminModule} from "@adminjs/nestjs";
import * as AdminJSTypeorm from '@adminjs/typeorm'
import AdminJS from 'adminjs'
import {ServeStaticModule} from "@nestjs/serve-static";
import {PlatformModule} from "./platform/platform.module";
import {PublicationModule} from "./publication/publication.module";
import { adminConfigurationFactory } from "./admin/configuration";
import {resolve} from 'path';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { databaseConfigurationFactory } from "../environments/database/database";

// Register typeorm adapter
AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
})

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'assets'),
      serveRoot: '/public/',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfigurationFactory,
    }),
    AdminModule.createAdminAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: adminConfigurationFactory
    }),
    PlatformModule,
    PublicationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
