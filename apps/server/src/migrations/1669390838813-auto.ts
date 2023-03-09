import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1669390838813 implements MigrationInterface {
    name = 'auto1669390838813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`platform\` DROP COLUMN \`logoMime\``);
        await queryRunner.query(`ALTER TABLE \`platform\` DROP COLUMN \`logo\``);
        await queryRunner.query(`ALTER TABLE \`platform\` ADD \`logo\` json NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
