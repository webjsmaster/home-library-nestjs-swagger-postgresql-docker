import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class TrackDto {
  @ApiProperty({ example: 'Money, Money, Money', description: 'Track name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ example: '8', description: 'Duration track' })
  @IsInt()
  @IsNotEmpty()
  readonly duration: number

  @ApiProperty({
    example: 'b66b2e29-188b-4ca2-8252-f6a9d248c318',
    description: 'Artist',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  artistId: string | null

  @ApiProperty({
    example: 'b66b2e29-188b-4ca2-8252-f6a9d248c318',
    description: 'Album',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  albumId: string | null
}
