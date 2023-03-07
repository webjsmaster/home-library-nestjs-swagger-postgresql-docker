export interface IBodyLogger {
  method: string
  originalUrl: string
  statusCode: number
  body: string
  response: {
    status: number
    error: string
    message: string
  }
  statusMessage: string
  ms: number
}

export type TypeLogger = 'log' | 'error' | 'warn' | 'verbose' | 'debug'
