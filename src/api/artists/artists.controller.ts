import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ArtistsService } from "./artists.service";
import { ArtistDto } from "./dto/artist.dto";
import { Express, Request } from "express";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ArtistEntity } from "./entity/artists.entity";
import { ApiFile } from "../../decorators/api-file.decorator";
import { BodyValidationPipe } from "./pipes/body.validation.pipe";

@ApiTags("Artists")
@Controller("artist")
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Get all artists" })
  @ApiResponse({ status: 200, description: "OK", type: [ArtistEntity] })
  @ApiResponse({ status: 403, description: "The user is not authorized" })
  @Get()
  async getAll() {
    return await this.artistService.getAll();
  }

  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Get one artist" })
  @ApiResponse({ status: 200, description: "OK", type: ArtistEntity })
  @ApiResponse({
    status: 400,
    description: "Validation failed (uuid is expected)",
  })
  @ApiResponse({ status: 404, description: "Not found" })
  @ApiResponse({ status: 403, description: "The user is not authorized" })
  @ApiParam({ name: "id", required: true, description: "Artist identifier" })
  @Get(":id")
  @HttpCode(HttpStatus.OK)
  getOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.artistService.getOne(id);
  }

  @ApiFile()
  // @ApiConsumes("multipart/form-data")
  // @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Create artist" })
  @ApiResponse({ status: 200, description: "OK", type: ArtistEntity })
  @ApiResponse({
    status: 400,
    description: "Body does not contain required fields",
  })
  @ApiResponse({ status: 403, description: "The user is not authorized" })
  @Post()
  create(
    @Body(BodyValidationPipe) body: ArtistDto,
    @UploadedFile() poster: Express.Multer.File,
  ) {
    console.log("📌:", poster, body);

    // return this.artistService.create(body, poster);
  }

  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Update artist" })
  @ApiResponse({ status: 200, description: "OK", type: ArtistEntity })
  @ApiResponse({
    status: 400,
    description: "Validation failed (uuid is expected)",
  })
  @ApiResponse({ status: 404, description: "Artist not found" })
  @ApiResponse({ status: 403, description: "The user is not authorized" })
  @ApiParam({ name: "id", required: true, description: "User identifier" })
  @UsePipes(ValidationPipe)
  @Put(":id")
  @HttpCode(HttpStatus.OK)
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() ChangeTrack: ArtistDto,
  ) {
    return this.artistService.update(id, ChangeTrack);
  }

  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Delete artist" })
  @ApiResponse({ status: 204, description: "OK" })
  @ApiResponse({
    status: 400,
    description: "Validation failed (uuid is expected)",
  })
  @ApiResponse({ status: 404, description: "Artist not found" })
  @ApiResponse({ status: 403, description: "The user is not authorized" })
  @ApiParam({ name: "id", required: true, description: "artist identifier" })
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Req() req: Request, @Param("id", ParseUUIDPipe) id: string) {
    const path = req.route.path.split("/");
    return this.artistService.delete(id, path[1]);
  }
}
