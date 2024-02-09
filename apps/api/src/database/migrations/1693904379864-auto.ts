import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class auto1693904379864 implements MigrationInterface {
  name = 'auto1693904379864';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('partner_platform_platform');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
}
