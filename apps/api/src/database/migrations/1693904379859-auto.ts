import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class Auto1693904379859 implements MigrationInterface {
  name = 'Auto1693904379859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop table news_tags_tag
    await queryRunner.dropTable('news_tags_tag', true, true, true);

    // Add column tagId to news
    await queryRunner.addColumn(
      'news',
      new TableColumn({
        name: 'tagId',
        type: 'int',
        isNullable: true,
      }),
    );
    // Add foreign key to news
    await queryRunner.createForeignKey(
      'news',
      new TableForeignKey({
        name: 'FK_ddc38c082bbd2b789d7194f4cab',
        columnNames: ['tagId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tag',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('news', 'FK_ddc38c082bbd2b789d7194f4cab');
    await queryRunner.dropColumn('news', 'tagId');
    await queryRunner.createTable(
      new Table({
        name: 'news_tags_tag',
        columns: [
          { name: 'newsId', type: 'int' },
          { name: 'tagId', type: 'int' },
        ],
        indices: [
          new TableIndex({
            name: 'IDX_bf8d62182508badf80afe19e22',
            columnNames: ['newsId'],
          }),
          new TableIndex({
            name: 'IDX_2aab0a462fb4ba47ad10760fbb',
            columnNames: ['tagId'],
          }),
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'FK_bf8d62182508badf80afe19e22',
            columnNames: ['newsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'news',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'FK_2aab0a462fb4ba47ad10760fbb',
            columnNames: ['tagId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tag',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
      true,
    );
  }
}
