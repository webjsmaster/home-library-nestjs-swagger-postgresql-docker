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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { TracksService } from './tracks.service'
import { TrackDto } from './dto/track.dto'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { TrackEntity } from './entity/tracks.entity'

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, description: 'OK', type: [TrackEntity] })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @Get()
  async getAll() {
    return await this.trackService.getAll()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get one track' })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @ApiParam({ name: 'id', required: true, description: 'Track identifier' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.getOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create track' })
  @ApiResponse({ status: 200, description: 'OK', type: TrackEntity })
  @ApiResponse({
    status: 400,
    description: 'Body does not contain required fields',
  })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @Post()
  create(
    @Body()
    CreateTrackDto: TrackDto,
  ) {
    return this.trackService.create(CreateTrackDto)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update track' })
  @ApiResponse({ status: 200, description: 'OK', type: TrackEntity })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @ApiParam({ name: 'id', required: true, description: 'Track identifier' })
  @UsePipes(ValidationPipe)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() ChangeTrack: TrackDto,
  ) {
    return this.trackService.update(id, ChangeTrack)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({ status: 204, description: 'OK' })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid is expected)',
  })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @ApiParam({ name: 'id', required: true, description: 'Track identifier' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.delete(id)
  }
}
