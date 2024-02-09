import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class auto1693904379865 implements MigrationInterface {
  name = 'auto1693904379865';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'platform',
      'description',
      new TableColumn({
        name: 'description',
        type: 'longtext',
        isNullable: false,
      }),
    );

    await queryRunner.changeColumn(
      'country',
      'name',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        length: '255',
        isNullable: false,
        isUnique: true,
      }),
    );

    await queryRunner.changeColumn(
      'news',
      'publicationDate',
      new TableColumn({
        name: 'publicationDate',
        type: 'varchar',
        length: '255',
        default: '(current_date)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'platform',
      'description',
      new TableColumn({
        name: 'description',
        type: 'longtext',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'country',
      'name',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        length: '255',
        isNullable: false,
        isUnique: false,
      }),
    );

    await queryRunner.changeColumn(
      'news',
      'publicationDate',
      new TableColumn({
        name: 'publicationDate',
        type: 'varchar',
        length: '255',
      }),
    );
  }
}
