import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IsInt, IsUUID } from 'class-validator'
import { ArtistEntity } from '../../artists/entity/artists.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity('album')
export class AlbumEntity {
  @ApiProperty({ example: 'b66b2e29-188b-4ca2-8252-f6a9d248c318', description: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({ example: 'Yellow submarine', description: 'Album name' })
  @Column()
  name: string

  @ApiProperty({ example: 1986, description: 'The date of writing' })
  @IsInt()
  @Column()
  year: number

  @ApiProperty({ example: 'b66b2e29-188b-4ca2-8252-f6a9d248c318', description: 'Artist id' })
  @IsUUID()
  @Column({ nullable: true })
  artistId: string | null

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({
    name: 'artistId',
    referencedColumnName: 'id',
  })
  artist: string | null

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial)
  }
}
