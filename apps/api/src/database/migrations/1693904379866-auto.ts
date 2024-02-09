import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class auto1693904379866 implements MigrationInterface {
  name = 'auto1693904379866';
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.changeColumn(
      'platform',
      'active',
      new TableColumn({
        name: 'hidden',
        type: 'boolean',
        default: false,
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'partner',
      new TableColumn({
        name: 'hidden',
        type: 'boolean',
        default: false,
        isNullable: false
      }),
    );

    await queryRunner.addColumn(
      'country',
      new TableColumn({
        name: 'hidden',
        type: 'boolean',
        default: false,
        isNullable: false
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'platform',
      'hidden',
      new TableColumn({
        name: 'active',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
    );

    await queryRunner.dropColumn('partner', 'hidden');
    await queryRunner.dropColumn('country', 'hidden');
  }
}
