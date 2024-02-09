import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class auto1693904379862 implements MigrationInterface {
  name = 'auto1693904379862';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'platform',
      new TableColumn({
        name: 'websiteJoinLink',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'platform',
      new TableColumn({
        name: 'about',
        type: 'longtext',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'platform',
      'description',
      new TableColumn({
        name: 'description',
        type: 'longtext',
      }),
    );
    await queryRunner.changeColumn(
      'partner',
      'description',
      new TableColumn({
        name: 'description',
        type: 'longtext',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('platform', 'websiteJoinLink');
    await queryRunner.dropColumn('platform', 'about');

    await queryRunner.changeColumn(
      'platform',
      'description',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        length: '255',
      }),
    );
    await queryRunner.changeColumn(
      'partner',
      'description',
      new TableColumn({
        name: 'description',
        type: 'longtext',
        length: '255',
      }),
    );
  }
}
