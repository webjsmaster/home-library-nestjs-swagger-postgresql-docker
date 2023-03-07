import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Req, UsePipes, ValidationPipe } from '@nestjs/common'
import { AlbumsService } from './albums.service'
import { CreateAlbumDto } from './dto/create-albums.dto'
import { Request } from 'express'
import { UpdateAlbumsDto } from './dto/update-albums.dto'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AlbumEntity } from './entity/albums.entity'

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, description: 'OK', type: [AlbumEntity] })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @Get()
  async getAll() {
    return await this.albumService.getAll()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get one album' })
  @ApiResponse({ status: 200, description: 'OK', type: AlbumEntity })
  @ApiResponse({ status: 400, description: 'Validation failed (uuid is expected)' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @ApiParam({ name: 'id', required: true, description: 'Album identifier' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.getOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create album' })
  @ApiResponse({ status: 200, description: 'OK', type: AlbumEntity })
  @ApiResponse({ status: 400, description: 'Body does not contain required fields' })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() CreateTrackDto: CreateAlbumDto) {
    return this.albumService.create(CreateTrackDto)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update album' })
  @ApiResponse({ status: 200, description: 'OK', type: AlbumEntity })
  @ApiResponse({ status: 400, description: 'Validation failed (uuid is expected)' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @ApiParam({ name: 'id', required: true, description: 'Album identifier' })
  @UsePipes(ValidationPipe)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() ChangeAlbum: UpdateAlbumsDto) {
    return this.albumService.update(id, ChangeAlbum)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete album' })
  @ApiResponse({ status: 204, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Validation failed (uuid is expected)' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @ApiParam({ name: 'id', required: true, description: 'album identifier' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const path = req.route.path.split('/')
    return this.albumService.delete(id, path[1])
  }
}
