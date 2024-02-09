import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MigrationCommand } from './migration.command';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationFactory } from '../environments/database/database';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfigurationFactory,
    }),
  ],
  controllers: [],
  providers: [MigrationCommand],
})
export class DatabaseModule {}
