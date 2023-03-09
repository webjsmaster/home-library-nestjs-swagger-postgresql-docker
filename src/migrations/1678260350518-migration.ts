import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1678260350518 implements MigrationInterface {
    name = 'migration1678260350518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" ADD "poster" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "poster"`);
    }

}
