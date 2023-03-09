import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1669388871167 implements MigrationInterface {
    name = 'auto1669388871167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`country\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`partner\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`website\` varchar(255) NULL, \`description\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`platform\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`website\` varchar(255) NULL, \`filePrefix\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`order\` int NULL DEFAULT '100', \`logo\` varchar(255) NULL, \`logoMime\` varchar(255) NULL, \`countryId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`publication\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`authors\` varchar(255) NOT NULL, \`publisher\` varchar(255) NOT NULL, \`publicationDate\` varchar(255) NOT NULL, \`url\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`partner_platform_platform\` (\`partnerId\` int NOT NULL, \`platformId\` int NOT NULL, INDEX \`IDX_888b6b5896f029a156922ee99c\` (\`partnerId\`), INDEX \`IDX_eb5a81c8ec1d9b568ac5c0d058\` (\`platformId\`), PRIMARY KEY (\`partnerId\`, \`platformId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`platform\` ADD CONSTRAINT \`FK_91d88a0d5d0a29f663b001e7a27\` FOREIGN KEY (\`countryId\`) REFERENCES \`country\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`partner_platform_platform\` ADD CONSTRAINT \`FK_888b6b5896f029a156922ee99cf\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partner\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`partner_platform_platform\` ADD CONSTRAINT \`FK_eb5a81c8ec1d9b568ac5c0d058c\` FOREIGN KEY (\`platformId\`) REFERENCES \`platform\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`partner_platform_platform\` DROP FOREIGN KEY \`FK_eb5a81c8ec1d9b568ac5c0d058c\``);
        await queryRunner.query(`ALTER TABLE \`partner_platform_platform\` DROP FOREIGN KEY \`FK_888b6b5896f029a156922ee99cf\``);
        await queryRunner.query(`ALTER TABLE \`platform\` DROP FOREIGN KEY \`FK_91d88a0d5d0a29f663b001e7a27\``);
        await queryRunner.query(`DROP INDEX \`IDX_eb5a81c8ec1d9b568ac5c0d058\` ON \`partner_platform_platform\``);
        await queryRunner.query(`DROP INDEX \`IDX_888b6b5896f029a156922ee99c\` ON \`partner_platform_platform\``);
        await queryRunner.query(`DROP TABLE \`partner_platform_platform\``);
        await queryRunner.query(`DROP TABLE \`publication\``);
        await queryRunner.query(`DROP TABLE \`platform\``);
        await queryRunner.query(`DROP TABLE \`partner\``);
        await queryRunner.query(`DROP TABLE \`country\``);
    }

}
