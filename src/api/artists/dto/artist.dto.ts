import { IsBooleanString, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ArtistDto {
  @ApiProperty({ example: "Queen", description: "Artist name" })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: true, description: "The presence of a Grammy bonus" })
  @IsBooleanString()
  @IsNotEmpty()
  readonly grammy: boolean;

  // @IsFile({ mime: ["image/jpg", "image/png"] })
  // @IsFile({ always: false })
  // @HasMimeType(["image/jpeg", "image/png"])
  @ApiProperty({
    example: "https://image.tmdb.org/t/p/w500/3z3F0Zp8a8D6r9y3LhU8b3Xg3n.jpg",
    description: "Poster image",
  })
  readonly poster: string | null;
}
