import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("artist")
export class ArtistEntity {
  @ApiProperty({
    example: "b66b2e29-188b-4ca2-8252-f6a9d248c318",
    description: "uuid",
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ example: "Queen", description: "Artist name" })
  @Column()
  name: string;

  @ApiProperty({ example: true, description: "The presence of a Grammy bonus" })
  @Column()
  grammy: boolean;

  @ApiProperty({
    example: __dirname + "e31befc1-5729-4808-b7d1-d50cc0c7e960.jpg",
    description: "Poster",
  })
  @Column({ nullable: true })
  poster: string;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
