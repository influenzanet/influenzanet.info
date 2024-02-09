// Export for Typeorm CLI
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import { Platform } from '@models/Platform';
import { Country } from '@models/Country';
import { Partner } from '@models/Partner';
import { Publication } from '@models/Publication';
import { News } from '@models/News';
import { Tag } from '@models/Tag';

console.log('parh check', __dirname, process.cwd());

const typeormDatasource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 8306,
  database: 'influenzanet',
  username: 'user',
  password: 'password',
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  entities: [Platform, Country, Partner, Publication, News, Tag],
  autoLoadEntities: false,
  synchronize: false,
  migrations: [
    path.join(process.cwd(), './apps/api/src/migrations/*{.ts,.js}'),
  ],
  cli: {
    migrationsDir: path.join(process.cwd(), './apps/api/src/migrations/'),
  },
} as DataSourceOptions);
typeormDatasource.initialize();
export default typeormDatasource;
