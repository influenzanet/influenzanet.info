import { Controller, Get } from '@nestjs/common';
import { Platform } from '@models/Platform';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, MigrationInterface, Repository } from 'typeorm';

@Controller('platform')
export class PlatformController {
  constructor(
    @InjectRepository(Platform) public platform: Repository<Platform>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  @Get('/')
  async findAll(): Promise<Platform[]> {
    return await this.platform.find({ relations: ['country', 'partners'] });
  }

  @Get('/migration/run')
  async migrationRun(): Promise<any> {
    try {
      const connection: DataSource = this.dataSource;
      const migrations: MigrationInterface[] = this.dataSource.migrations;
      const pending: boolean = await this.dataSource.showMigrations();

      await this.dataSource.runMigrations({ transaction: 'each' });
      return { migrations, pending };
    } catch (e) {
      return e;
    }
  }

  @Get('/migration/undo')
  async migrationUndo(): Promise<any> {
    try {
      const connection: DataSource = this.dataSource;
      const migrations: MigrationInterface[] = this.dataSource.migrations;
      const pending: boolean = await this.dataSource.showMigrations();

      await this.dataSource.undoLastMigration();
      return { migrations, pending };
    } catch (e) {
      return e;
    }
  }

  @Get('/migration/destroy')
  async migrationDestroy(): Promise<any> {
    try {
      const connection: DataSource = this.dataSource;
      const migrations: MigrationInterface[] = this.dataSource.migrations;
      const pending: boolean = await this.dataSource.showMigrations();

      await this.dataSource.destroy();
      return { migrations, pending };
    } catch (e) {
      return e;
    }
  }

  @Get('/migration/generate')
  async migrationGenerate(): Promise<any> {
    try {
      const connection: DataSource = this.dataSource;
      const migrations: MigrationInterface[] = this.dataSource.migrations;
      // const pending: boolean = await this.dataSource.showMigrations();

      return { connection };

      // return {migrations, pending}
    } catch (e) {
      return e;
    }
  }
}
