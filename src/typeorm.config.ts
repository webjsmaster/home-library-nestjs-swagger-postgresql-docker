import * as dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions, FileLogger } from "typeorm";
import { AlbumEntity, ArtistEntity, FavoritesEntity, TrackEntity, UserEntity } from "./api";

dotenv.config();

export const options = {
  type: process.env.TYPEORM_CONNECTION as string,
  host: process.env.TYPEORM_HOST as string,
  port: parseInt(process.env.TYPEORM_PORT as string, 10) as number,
  username: process.env.TYPEORM_USERNAME as string,
  database: process.env.TYPEORM_DATABASE as string,
  password: process.env.TYPEORM_PASSWORD as string,
  migrationsRun: true,
  synchronize: false,
  logging: true,
  logger: new FileLogger(true, { logPath: "./logs/ormlogs.log" })
};

export const dataSourceConfig = {
  ...options,
  entities: [
    UserEntity,
    ArtistEntity,
    AlbumEntity,
    TrackEntity,
    FavoritesEntity
  ],
  migrations: ["src/migrations/*.{ts,js}"]
} as DataSourceOptions;

export const typeOrmConfig = {
  ...options,
  entities: [__dirname + "/**/**/*.entity.{ts,js}"],
  migrations: [__dirname + "./migrations/*.{ts,js}"],
  retryAttempts: 10
} as TypeOrmModuleOptions;
