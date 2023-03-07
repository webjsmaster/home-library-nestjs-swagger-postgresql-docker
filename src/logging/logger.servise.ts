import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common'
import { logsRecorder } from '../utils/logsRecorder'
import { IBodyLogger } from '../types/logger'

const allLogLevels: LogLevel[] = ['error', 'warn', 'log', 'verbose', 'debug']

@Injectable()
export class MyLogger extends ConsoleLogger {
  private readonly levels

  constructor() {
    const logLevels = allLogLevels.slice(0, +process.env.LOG_LEVEL + 1)
    super('App', { logLevels })
    this.levels = logLevels
  }

  private message(params) {
    return `URL:${params.originalUrl} <> Method:${params.method} <> Body:${JSON.stringify(params.body)} <> ResponseBody: ${JSON.stringify(params.response)} <> \x1b[33m+${
      params.ms
    }ms\x1b[0m`
  }

  log(message: IBodyLogger) {
    super.log(this.message(message))
    logsRecorder(message, 'log', this.levels)
  }

  error(message: IBodyLogger) {
    super.error(this.message(message))
    logsRecorder(message, 'error', this.levels)
  }

  warn(message: IBodyLogger) {
    super.warn(this.message(message))
    logsRecorder(message, 'warn', this.levels)
  }

  debug(message: IBodyLogger) {
    super.debug(this.message(message))
    logsRecorder(message, 'debug', this.levels)
  }

  verbose(message: IBodyLogger) {
    super.verbose(this.message(message))
    logsRecorder(message, 'verbose', this.levels)
  }
}
