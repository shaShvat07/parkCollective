import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponseDto } from '../dtos/error-response.dto';
import { ApplicationConstants } from '../application-contants';
import { LoggerService } from '../../logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger: LoggerService = new LoggerService();
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    this.logger.debug(
      'HttpExceptionFilter -- Exception received : ' + exception,
    );

    const errorResponseDto: ErrorResponseDto =
      ErrorResponseDto.getFilledResponseObjectAllArgs(
        null,
        exception.getResponse()[ApplicationConstants.MESSAGE_STR],
        exception.getResponse()[ApplicationConstants.CODE_STR],
      );
    response.status(status).json(errorResponseDto);
  }
}
