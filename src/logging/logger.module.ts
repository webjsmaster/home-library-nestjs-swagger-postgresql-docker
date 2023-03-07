import { Module } from '@nestjs/common'
import { MyLogger } from './logger.servise'

@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
