import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUsersDto, UpdateUserDto } from './dto/users.dto'
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserEntity } from './entity/users.entity'

//npx @nestjs/cli g c users

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'OK', type: [UserEntity] })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAll() {
    return this.usersService.getAll()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get one users' })
  @ApiResponse({ status: 200, description: 'OK', type: UserEntity })
  @ApiResponse({ status: 400, description: 'Validation failed (uuid is expected)' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'OK', type: UserEntity })
  @ApiResponse({ status: 400, description: 'Body does not contain required fields' })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() CreateUser: CreateUsersDto) {
    return this.usersService.create(CreateUser)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'OK', type: UserEntity })
  @ApiResponse({ status: 400, description: 'Validation failed (uuid is expected)' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Old password is wrong' })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUser: UpdateUserDto) {
    return this.usersService.update(id, updateUser)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Validation failed (uuid is expected)' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'The user is not authorized' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id)
  }

  @ApiExcludeEndpoint()
  @Get('/test/1')
  testing() {
    return this.usersService.testing()
  }
}
