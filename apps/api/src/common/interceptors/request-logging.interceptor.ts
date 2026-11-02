import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const startedAt = Date.now();
    return next.handle().pipe(
      finalize(() => {
        this.logger.log(
          JSON.stringify({
            method: request.method,
            path: request.originalUrl,
            status: response.statusCode,
            durationMs: Date.now() - startedAt,
            requestId: request.headers['x-request-id'],
          }),
        );
      }),
    );
  }
}
