import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformModule } from './platform/platform.module';
import { PublicationModule } from './publication/publication.module';
import { NewsModule } from './news/news.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfigurationFactory } from '../environments/database/database';
import { TagModule } from './tag/tag.module';
import { CommandModule } from 'nestjs-command';
import { MigrationCommand } from '@database/migration.command';
import { PartnerModule } from './partner/partner.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import {resolve} from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    ...(
      process.env.NODE_ENV === 'development'
        ? [ServeStaticModule.forRoot({
          rootPath: resolve(__dirname, 'assets/data'),
          serveRoot: '/assets/data/',
        })]
        : []
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfigurationFactory,
    }),
    CommandModule,
    PlatformModule,
    PublicationModule,
    NewsModule,
    TagModule,
    PartnerModule,
  ],
  controllers: [AppController],
  providers: [MigrationCommand],
})
export class AppModule {}
