import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class auto1669390838813 implements MigrationInterface {
  name = 'auto1669390838813';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('platform', 'logoMime');
    await queryRunner.changeColumn(
      'platform',
      'logo',
      new TableColumn({
        name: 'logo',
        type: 'json',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'platform',
      new TableColumn({
        name: 'logoMime',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
    await queryRunner.changeColumn(
      'platform',
      'logo',
      new TableColumn({
        name: 'logo',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
  }
}
