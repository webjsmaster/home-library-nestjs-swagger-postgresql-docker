import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity('artist')
export class ArtistEntity {
  @ApiProperty({
    example: 'b66b2e29-188b-4ca2-8252-f6a9d248c318',
    description: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({ example: 'Queen', description: 'Artist name' })
  @Column()
  name: string

  @ApiProperty({ example: true, description: 'The presence of a Grammy bonus' })
  @Column()
  grammy: boolean

  @ApiProperty({
    example: 'https://image.tmdb.org/t/p/w500/3z3F0Zp8a8D6r9y3LhU8b3Xg3n.jpg',
    description: 'Poster',
  })
  @Column({ nullable: true })
  poster: string

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial)
  }
}
