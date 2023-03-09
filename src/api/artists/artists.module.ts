import { Module } from "@nestjs/common";
import { ArtistsController } from "./artists.controller";
import { ArtistsService } from "./artists.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistEntity } from "./entity/artists.entity";
import { TracksModule } from "../tracks/tracks.module";
import { FilesModule } from "../files/files.module";
import { NestjsFormDataModule } from "nestjs-form-data";

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistEntity]),
    TracksModule,
    FilesModule,
    NestjsFormDataModule,
  ],
  providers: [ArtistsService],
  controllers: [ArtistsController],
  exports: [ArtistsService],
})
export class ArtistsModule {}
