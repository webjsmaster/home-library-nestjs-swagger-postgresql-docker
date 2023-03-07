import { appendFileSync, existsSync, statSync } from 'fs'
import { rename, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { currentDate } from './date-format'
import { IBodyLogger, TypeLogger } from '../types/logger'
import * as os from 'os'
import { LogLevel } from '@nestjs/common'

export const logsRecorder = async (params: IBodyLogger, type: TypeLogger, logLevels: LogLevel[]) => {
  const message =
    `[Nest] - ${currentDate()} URL:${params.originalUrl} - <> Method:${params.method}` +
    ' <> Body:' +
    JSON.stringify(params.body) +
    `<> StatusMessage: ${params.statusMessage} <> ResponseBody: ${JSON.stringify(params.response)} <> ${params.ms}ms` +
    os.EOL

  logLevels.map(async (lev) => {
    if (lev === type) {
      const file = resolve(process.cwd() + '/logs/' + lev + '-file.txt')

      if (!existsSync(file)) {
        await writeFile(file, '', { flag: 'wx' })
      }

      appendFileSync(file, message)

      const fileSizeInBytes = statSync(file).size / 1024 / 1024

      const fileSize = +process.env.SIZE_LOG_FILE || 0.01

      if (fileSizeInBytes > fileSize) {
        const newFile = resolve(process.cwd() + '/logs/' + type + '-history-' + Date.now() + '-file.txt')
        await rename(file, newFile)
      }
    }
  })
}
