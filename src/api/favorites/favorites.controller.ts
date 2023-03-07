import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common'
import { FavoritesService } from './favorites.service'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { FavoritesEntity } from './entity/favorites.entity'

type Path = 'artist' | 'album' | 'track'

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, description: 'OK', type: [FavoritesEntity] })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll() {
    return this.favoriteService.getAll()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Add in favorites' })
  @ApiResponse({ status: 201, description: 'OK' })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({ status: 422, description: 'Entity not found in favorites' })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @Post(':path/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(
    @Req() req: Request,
    @Param('path') path: Path,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    if (path === 'artist' || path === 'album' || path === 'track') {
      return this.favoriteService.add(id, path)
    } else {
      throw new NotFoundException({
        statusCode: 404,
        message: `Cannot POST ${req.url}`,
        error: 'Not Found',
      })
    }
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete in favorites' })
  @ApiResponse({ status: 204, description: 'OK' })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({ status: 422, description: 'Entity not found in favorites' })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @ApiProperty({
    enum: ['Track'],
  })
  @Delete(':path/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(
    @Req() req: Request,
    @Param('path') path: Path,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    if (path === 'artist' || path === 'album' || path === 'track') {
      return this.favoriteService.delete(id, path)
    } else {
      throw new NotFoundException({
        statusCode: 404,
        message: `Cannot DELETE ${req.url}`,
        error: 'Not Found',
      })
    }
  }
}
