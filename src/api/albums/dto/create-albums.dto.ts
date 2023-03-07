import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateAlbumDto {
  @ApiProperty({ example: 'Yellow submarine', description: 'Album name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ example: 1986, description: 'The date of writing' })
  @IsInt()
  @IsNotEmpty()
  readonly year: number

  @ApiProperty({
    example: 'b66b2e29-188b-4ca2-8252-f6a9d248c318',
    description: 'Artist id',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null
}
