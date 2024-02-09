import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class auto1693472042796 implements MigrationInterface {
  name = 'auto1693472042796';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tag',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'label', type: 'varchar', length: '255' },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'news',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar', length: '255' },
          { name: 'content', type: 'longtext' },
          { name: 'publicationDate', type: 'varchar', length: '255' },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'news_tags_tag',
        columns: [
          { name: 'newsId', type: 'int' },
          { name: 'tagId', type: 'int' },
        ],
        indices: [
          { name: 'IDX_bf8d62182508badf80afe19e22', columnNames: ['newsId'] },
          { name: 'IDX_2aab0a462fb4ba47ad10760fbb', columnNames: ['tagId'] },
        ],
        foreignKeys: [
          {
            columnNames: ['newsId'],
            referencedTableName: 'news',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['tagId'],
            referencedTableName: 'tag',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('news_tags_tag');
    await queryRunner.dropTable('news');
    await queryRunner.dropTable('tag');
  }
}
