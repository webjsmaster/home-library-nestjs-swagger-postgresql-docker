import { ArtistEntity } from './artists/entity/artists.entity'
import { AlbumEntity } from './albums/entity/albums.entity'
import { TrackEntity } from './tracks/entity/tracks.entity'
import { FavoritesEntity } from './favorites/entity/favorites.entity'
import { UserEntity } from './users/entity/users.entity'

import { UsersModule } from './users/users.module'
import { ArtistsModule } from './artists/artists.module'
import { AlbumsModule } from './albums/albums.module'
import { TracksModule } from './tracks/tracks.module'
import { FavoritesModule } from './favorites/favorites.module'
import { AuthModule } from './auth/auth.module'

import { ArtistsService } from './artists/artists.service'
import { AlbumsService } from './albums/albums.service'
import { TracksService } from './tracks/tracks.service'
import { FavoritesService } from './favorites/favorites.service'
import { FilesService } from './files/files.service'

export { ArtistEntity, AlbumEntity, TrackEntity, FavoritesEntity, UserEntity }

export {
  ArtistsModule,
  UsersModule,
  AlbumsModule,
  TracksModule,
  FavoritesModule,
  AuthModule,
}

export {
  ArtistsService,
  AlbumsService,
  TracksService,
  FavoritesService,
  FilesService,
}
