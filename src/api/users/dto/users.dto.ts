import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUsersDto {
  @ApiProperty({ example: 'Bob', description: 'User Login' })
  @IsString()
  @IsNotEmpty()
  readonly login: string

  @ApiProperty({ example: '12345', description: 'User Password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string
}

export class UpdateUserDto {
  @ApiProperty({ example: 'Bob', description: 'User Login' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string

  @ApiProperty({ example: '12345', description: 'User Password' })
  @IsString()
  @IsNotEmpty()
  newPassword: string
}
