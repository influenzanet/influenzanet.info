import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class auto1693904379860 implements MigrationInterface {
  name = 'auto1693904379860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'publication',
      'authors',
      new TableColumn({
        name: 'authors',
        type: 'text',
        length: '1000',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'publication',
      'authors',
      new TableColumn({
        name: 'authors',
        type: 'varchar',
        length: '255',
      }),
    );
  }
}
