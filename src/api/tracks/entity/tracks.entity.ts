import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AlbumEntity } from '../../albums/entity/albums.entity'
import { ArtistEntity } from '../../artists/entity/artists.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity('tracks')
export class TrackEntity {
  @ApiProperty({ example: 'b66b2e29-188b-4ca2-8252-f6a9d248c318', description: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({ example: 'Money, Money, Money', description: 'Track name' })
  @Column()
  name: string

  @ApiProperty({ example: 'b66b2e29-188b-4ca2-8252-f6a9d248c318', description: 'Artist id' })
  @Column({ nullable: true })
  artistId: string | null

  @ApiProperty({ example: 'b66b2e29-188b-4ca2-8252-f6a9d248c318', description: 'Album id' })
  @Column({ nullable: true })
  albumId: string | null

  @ApiProperty({ example: '8', description: 'Duration track' })
  @Column()
  duration: number

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({
    name: 'artistId',
    referencedColumnName: 'id',
  })
  artist: string | null

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({
    name: 'albumId',
    referencedColumnName: 'id',
  })
  album: string | null

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial)
  }
}
