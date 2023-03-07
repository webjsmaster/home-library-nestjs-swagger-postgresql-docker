import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1678027927985 implements MigrationInterface {
    name = 'migration1678027927985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_albums_album" ("favoriteId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_4247432ea32c9166fead9833826" PRIMARY KEY ("favoriteId", "albumId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c2bdc9716bf0cf30d4275ceefc" ON "favorite_albums_album" ("favoriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd3dab78afa4f449ef616a2449" ON "favorite_albums_album" ("albumId") `);
        await queryRunner.query(`CREATE TABLE "favorite_artists_artist" ("favoriteId" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_9daf4f3eab7a3ee1831d06356af" PRIMARY KEY ("favoriteId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fc6278dcd7f4ec83657af3d66c" ON "favorite_artists_artist" ("favoriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d712ba0a257e954870e3114f25" ON "favorite_artists_artist" ("artistId") `);
        await queryRunner.query(`CREATE TABLE "favorite_tracks_tracks" ("favoriteId" uuid NOT NULL, "tracksId" uuid NOT NULL, CONSTRAINT "PK_360c03a7c5384b5ec1d25ab781e" PRIMARY KEY ("favoriteId", "tracksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a515d014641a0cd4a4988d5108" ON "favorite_tracks_tracks" ("favoriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d3bbca2ebb88ef941cde58f0c" ON "favorite_tracks_tracks" ("tracksId") `);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_albums_album" ADD CONSTRAINT "FK_c2bdc9716bf0cf30d4275ceefcf" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_albums_album" ADD CONSTRAINT "FK_bd3dab78afa4f449ef616a24491" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_artists_artist" ADD CONSTRAINT "FK_fc6278dcd7f4ec83657af3d66c4" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_artists_artist" ADD CONSTRAINT "FK_d712ba0a257e954870e3114f250" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_tracks_tracks" ADD CONSTRAINT "FK_a515d014641a0cd4a4988d51087" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_tracks_tracks" ADD CONSTRAINT "FK_5d3bbca2ebb88ef941cde58f0c2" FOREIGN KEY ("tracksId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_tracks_tracks" DROP CONSTRAINT "FK_5d3bbca2ebb88ef941cde58f0c2"`);
        await queryRunner.query(`ALTER TABLE "favorite_tracks_tracks" DROP CONSTRAINT "FK_a515d014641a0cd4a4988d51087"`);
        await queryRunner.query(`ALTER TABLE "favorite_artists_artist" DROP CONSTRAINT "FK_d712ba0a257e954870e3114f250"`);
        await queryRunner.query(`ALTER TABLE "favorite_artists_artist" DROP CONSTRAINT "FK_fc6278dcd7f4ec83657af3d66c4"`);
        await queryRunner.query(`ALTER TABLE "favorite_albums_album" DROP CONSTRAINT "FK_bd3dab78afa4f449ef616a24491"`);
        await queryRunner.query(`ALTER TABLE "favorite_albums_album" DROP CONSTRAINT "FK_c2bdc9716bf0cf30d4275ceefcf"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_62f595181306916265849fced48"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d3bbca2ebb88ef941cde58f0c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a515d014641a0cd4a4988d5108"`);
        await queryRunner.query(`DROP TABLE "favorite_tracks_tracks"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d712ba0a257e954870e3114f25"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fc6278dcd7f4ec83657af3d66c"`);
        await queryRunner.query(`DROP TABLE "favorite_artists_artist"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bd3dab78afa4f449ef616a2449"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2bdc9716bf0cf30d4275ceefc"`);
        await queryRunner.query(`DROP TABLE "favorite_albums_album"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP TABLE "tracks"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
    }

}
