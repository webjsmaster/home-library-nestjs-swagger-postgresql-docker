import { forwardRef, Module } from '@nestjs/common'
import { TracksController } from './tracks.controller'
import { TracksService } from './tracks.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TrackEntity } from './entity/tracks.entity'
import { ArtistsModule } from '../artists/artists.module'
import { AlbumsModule } from '../albums/albums.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    forwardRef(() => ArtistsModule),
    AlbumsModule,
  ],
  providers: [TracksService],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
