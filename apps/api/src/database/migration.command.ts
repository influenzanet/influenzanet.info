import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CatchMigrationError } from './dabase.helper';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { initialSeed } from '@database/seed/Seed';
import path from 'path';
import { copy } from "fs-extra";


@Injectable()
export class MigrationCommand {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    public configService: ConfigService,
  ) {}

  @Command({
    command: 'migration:generate',
    describe:
      'Generate a migration file with differences between models and database',
  })
  @CatchMigrationError()
  async Make() {}

  @Command({
    command: 'migration:apply',
    describe: 'Apply all pending migrations',
  })
  @CatchMigrationError()
  async Apply() {
    const pending: boolean = await this.dataSource.showMigrations();
    if (pending) {
      await this.dataSource.runMigrations({ transaction: 'each' });
      console.log('\x1b[0m%s\x1b[0m', 'MIGRATION', '\x1b[32m', '✓', '\x1b[0m');
    } else {
      console.log(
        '\x1b[0m%s\x1b[0m',
        'MIGRATION',
        '\x1b[33m',
        '✓ (NO MIGRATIONS TO APPLY)',
        '\x1b[0m',
      );
    }
  }

  @Command({
    command: 'migration:undo',
    describe: 'Revert the last migration',
  })
  @CatchMigrationError()
  async Undo() {
    await this.dataSource.undoLastMigration();
  }

  @Command({
    command: 'migration:seed',
    describe: 'Add Example data to database and logo files to assets directory',
  })
  @CatchMigrationError()
  async Seed() {
    console.log(' ');
    await this.Apply();
    await this.SeedDb();
    await this.SeedLogo();
    await this.SeedData();
  }

  @Command({
    command: 'migration:seed-db',
    describe: 'Add Example data to database',
  })
  @CatchMigrationError()
  async SeedDb() {
    await initialSeed(this.dataSource);
  }

  @Command({
    command: 'migration:seed-logo',
    describe: 'Add logo files to assets directory',
  })
  @CatchMigrationError()
  async SeedLogo() {
    const logoSourcePath = path.join(__dirname, 'example-data/logo');
    const logoDestinationPath = process.env.NODE_ENV === 'development'
      ? path.join(__dirname, '../admin/assets/upload/logo')
      : path.join(__dirname, 'assets/upload/logo')

    await copy(
      `${logoSourcePath}`,
      `${logoDestinationPath}`,
      { recursive: true }
    );
    console.log('\x1b[0m%s\x1b[0m', 'SEED LOGO', '\x1b[32m', '✓', '\x1b[0m');
  }


  @Command({
    command: 'migration:seed-data',
    describe: 'Add logo files to assets directory',
  })
  @CatchMigrationError()
  async SeedData() {
    const src = path.join(__dirname, 'example-data/data/platform-data');
    const dest = path.join(__dirname, 'assets/data/platform-data');

    await copy(
      `${src}`,
      `${dest}`,
      { recursive: true }
    );
    console.log('\x1b[0m%s\x1b[0m', 'SEED PLATFORM DATA FILES', '\x1b[32m', '✓', '\x1b[0m');
  }
}
