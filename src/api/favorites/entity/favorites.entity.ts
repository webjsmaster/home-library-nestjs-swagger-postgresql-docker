import { Exclude } from 'class-transformer'
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AlbumEntity } from '../../albums/entity/albums.entity'
import { ArtistEntity } from '../../artists/entity/artists.entity'
import { TrackEntity } from '../../tracks/entity/tracks.entity'

@Entity('favorite')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string

  @ManyToMany(() => AlbumEntity, {
    eager: true,
  })
  @JoinTable()
  albums: AlbumEntity[]

  @ManyToMany(() => ArtistEntity, {
    eager: true,
  })
  @JoinTable()
  artists: ArtistEntity[]

  @ManyToMany(() => TrackEntity, {
    eager: true,
  })
  @JoinTable()
  tracks: TrackEntity[]
}
