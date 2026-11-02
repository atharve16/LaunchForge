import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload = exception instanceof HttpException ? exception.getResponse() : null;
    const message = this.extractMessage(payload, status);
    const code = this.extractCode(payload, status);

    if (status >= 500) {
      this.logger.error(
        `${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    response.status(status).json({
      success: false,
      error: {
        code,
        message,
        ...(status === Number(HttpStatus.BAD_REQUEST) && typeof payload === 'object'
          ? { details: payload }
          : {}),
        requestId: request.headers['x-request-id'],
      },
    });
  }

  private extractMessage(payload: unknown, status: number): string {
    if (status >= 500) return 'An unexpected error occurred.';
    if (typeof payload === 'string') return payload;
    if (payload && typeof payload === 'object' && 'message' in payload) {
      const message = payload.message;
      return Array.isArray(message) ? message.join('; ') : String(message);
    }
    return 'Request failed.';
  }

  private extractCode(payload: unknown, status: number): string {
    if (payload && typeof payload === 'object' && 'code' in payload) return String(payload.code);
    return `HTTP_${status}`;
  }
}
