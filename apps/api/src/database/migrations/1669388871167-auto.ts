import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialMigration1629381234567 implements MigrationInterface {
  name = 'InitialMigration1629381234567';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'country',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'partner',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'logo',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'website',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'platform',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'website',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'filePrefix',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'active',
            type: 'tinyint',
            default: 1,
          },
          {
            name: 'order',
            type: 'int',
            isNullable: true,
            default: 100,
          },
          {
            name: 'logo',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'logoMime',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'countryId',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['countryId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'country',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'publication',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'authors',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'publisher',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'publicationDate',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'url',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'partner_platform_platform',
        columns: [
          {
            name: 'partnerId',
            type: 'int',
          },
          {
            name: 'platformId',
            type: 'int',
          },
        ],
        indices: [
          {
            name: 'IDX_888b6b5896f029a156922ee99c',
            columnNames: ['partnerId'],
          },
          {
            name: 'IDX_eb5a81c8ec1d9b568ac5c0d058',
            columnNames: ['platformId'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['partnerId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'partner',
          },
          {
            columnNames: ['platformId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'platform',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('partner_platform_platform');
    await queryRunner.dropTable('publication');
    await queryRunner.dropTable('platform');
    await queryRunner.dropTable('partner');
    await queryRunner.dropTable('country');
  }
}

// import { MigrationInterface, QueryRunner, Table } from "typeorm";

// export class auto1669388871167 implements MigrationInterface {
//   name = 'auto1669388871167'
//
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`CREATE TABLE \`country\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//     await queryRunner.query(`CREATE TABLE \`partner\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`website\` varchar(255) NULL, \`description\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//     await queryRunner.query(`CREATE TABLE \`platform\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`website\` varchar(255) NULL, \`filePrefix\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`order\` int NULL DEFAULT '100', \`logo\` varchar(255) NULL, \`logoMime\` varchar(255) NULL, \`countryId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//     await queryRunner.query(`CREATE TABLE \`publication\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`authors\` varchar(255) NOT NULL, \`publisher\` varchar(255) NOT NULL, \`publicationDate\` varchar(255) NOT NULL, \`url\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//     await queryRunner.query(`CREATE TABLE \`partner_platform_platform\` (\`partnerId\` int NOT NULL, \`platformId\` int NOT NULL, INDEX \`IDX_888b6b5896f029a156922ee99c\` (\`partnerId\`), INDEX \`IDX_eb5a81c8ec1d9b568ac5c0d058\` (\`platformId\`), PRIMARY KEY (\`partnerId\`, \`platformId\`)) ENGINE=InnoDB`);
//     await queryRunner.query(`ALTER TABLE \`platform\` ADD CONSTRAINT \`FK_91d88a0d5d0a29f663b001e7a27\` FOREIGN KEY (\`countryId\`) REFERENCES \`country\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     await queryRunner.query(`ALTER TABLE \`partner_platform_platform\` ADD CONSTRAINT \`FK_888b6b5896f029a156922ee99cf\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partner\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
//     await queryRunner.query(`ALTER TABLE \`partner_platform_platform\` ADD CONSTRAINT \`FK_eb5a81c8ec1d9b568ac5c0d058c\` FOREIGN KEY (\`platformId\`) REFERENCES \`platform\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
//   }
//
//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`ALTER TABLE \`partner_platform_platform\` DROP FOREIGN KEY \`FK_eb5a81c8ec1d9b568ac5c0d058c\``);
//     await queryRunner.query(`ALTER TABLE \`partner_platform_platform\` DROP FOREIGN KEY \`FK_888b6b5896f029a156922ee99cf\``);
//     await queryRunner.query(`ALTER TABLE \`platform\` DROP FOREIGN KEY \`FK_91d88a0d5d0a29f663b001e7a27\``);
//     await queryRunner.query(`DROP INDEX \`IDX_eb5a81c8ec1d9b568ac5c0d058\` ON \`partner_platform_platform\``);
//     await queryRunner.query(`DROP INDEX \`IDX_888b6b5896f029a156922ee99c\` ON \`partner_platform_platform\``);
//     await queryRunner.query(`DROP TABLE \`partner_platform_platform\``);
//     await queryRunner.query(`DROP TABLE \`publication\``);
//     await queryRunner.query(`DROP TABLE \`platform\``);
//     await queryRunner.query(`DROP TABLE \`partner\``);
//     await queryRunner.query(`DROP TABLE \`country\``);
//   }
//
// }
