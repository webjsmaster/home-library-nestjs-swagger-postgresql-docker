import { forwardRef, Module } from '@nestjs/common'
import { AlbumsController } from './albums.controller'
import { AlbumsService } from './albums.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AlbumEntity } from './entity/albums.entity'
import { ArtistsModule } from '../artists/artists.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    forwardRef(() => ArtistsModule),
  ],
  providers: [AlbumsService],
  controllers: [AlbumsController],
  exports: [AlbumsService],
})
export class AlbumsModule {}
