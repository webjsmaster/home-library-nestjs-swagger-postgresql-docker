import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FavoritesEntity } from './entity/favorites.entity'
import { FavoritesService } from './favorites.service'
import { FavoritesController } from './favorites.controller'
import { ArtistsModule } from '../artists/artists.module'
import { AlbumsModule } from '../albums/albums.module'
import { TracksModule } from '../tracks/tracks.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity]),
    ArtistsModule,
    AlbumsModule,
    TracksModule,
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController],
  exports: [FavoritesService],
})
export class FavoritesModule {}
