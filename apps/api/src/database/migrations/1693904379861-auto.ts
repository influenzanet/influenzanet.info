import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class auto1693904379861 implements MigrationInterface {
  name = 'auto1693904379861';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'partner',
      'logo',
      new TableColumn({
        name: 'logo',
        type: 'json',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'partner',
      new TableColumn({
        name: 'platformId',
        type: 'int',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'partner',
      new TableForeignKey({
        name: 'FK_ddc38c082bbd2b789d7194f4cac',
        columnNames: ['platformId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'platform',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'partner',
      'logo',
      new TableColumn({
        name: 'logo',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
    await queryRunner.dropForeignKey(
      'partner',
      'FK_ddc38c082bbd2b789d7194f4cac',
    );
    await queryRunner.dropColumn('partner', 'platformId');
  }
}
