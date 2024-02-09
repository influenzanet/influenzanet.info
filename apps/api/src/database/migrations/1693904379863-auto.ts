import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class auto1693904379863 implements MigrationInterface {
  name = 'auto1693904379863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'partner',
      new TableColumn({
        name: 'order',
        type: 'int',
        default: 100,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('partner', 'order');
  }
}
