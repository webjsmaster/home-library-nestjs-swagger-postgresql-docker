import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { IBodyLogger } from '../types/logger'
import { MyLogger } from '../logging/logger.servise'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new MyLogger()
  private readonly defLogger = new Logger()
  private resData = { message: '', error: '', status: null }

  constructor() {
    process.on('unhandledRejection', (reason, promise) => {
      this.defLogger.error(`🆘Unhandled Rejection at: ${promise}, reason: ${reason}`)
      throw reason
    })

    process.on('uncaughtException', (err: any, origin) => {
      this.defLogger.error(`😜Caught exception: ${err.toString()}\n` + `Exception origin: ${origin}`)
      if (!err.isOperational) {
        process.exit(1)
      }
    })
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { body, method, originalUrl } = req
    const start = Date.now()

    this.getResponse(res)

    res.on('finish', () => {
      const { statusCode, statusMessage } = res
      const ms = Date.now() - start
      const content: IBodyLogger = { method, originalUrl, statusCode, body, statusMessage, response: this.resData, ms }

      if (statusCode.toString().startsWith('2')) {
        this.logger.log(content)
      } else if (statusCode.toString().startsWith('4')) {
        this.logger.warn(content)
      } else if (statusCode.toString().startsWith('5')) {
        this.logger.error(content)
      } else {
        this.logger.verbose(content)
      }
    })
    next()
  }

  private getResponse(res: Response) {
    const send = res.send
    res.send = (data) => {
      this.resData = data ? JSON.parse(data.toString()) : ''
      res.send = send
      return res.send(data)
    }
  }
}
