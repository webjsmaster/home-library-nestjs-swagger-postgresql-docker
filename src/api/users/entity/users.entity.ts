import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

@Entity('users')
export class UserEntity {
  @ApiProperty({ example: 'b66b2e29-188b-4ca2-8252-f6a9d248c318', description: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({ example: 'login', description: 'User login' })
  @Column()
  login: string

  @ApiProperty({ example: 'password', description: 'User password' })
  @Exclude()
  @Column()
  password: string

  @ApiProperty({ example: '1', description: 'Version' })
  @Column()
  version: number

  @ApiProperty({ example: '1678017534093', description: 'Date of creation' })
  @CreateDateColumn({
    transformer: {
      from: (value: Date) => value.getTime(),
      to: (value: Date) => value,
    },
  })
  createdAt: number

  @ApiProperty({ example: '1678017534456', description: 'Date of update' })
  @UpdateDateColumn({
    transformer: {
      from: (value: Date) => value.getTime(),
      to: (value: Date) => value,
    },
  })
  updatedAt: number

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}
