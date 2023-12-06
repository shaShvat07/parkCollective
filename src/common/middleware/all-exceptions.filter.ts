// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { CommonMethods } from '../utils/common';
// import { ErrorResponseDto } from '../dtos/error-response.dto';
// import { ApplicationConstants } from '../application-contants';
// import { LoggerService } from '../../logger/logger.service';

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   private readonly logger: LoggerService;
//   constructor() {
//     this.logger = new LoggerService();
//   }
//   catch(exception: Error, host: ArgumentsHost): any {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     const statusCode =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     this.logger.error(
//       'Environment :' + process.env.ENV + ', Error --> ' + exception,
//     );

//     const errorResponseDto: ErrorResponseDto =
//       ErrorResponseDto.getFilledResponseObjectAllArgs(
//         process.env.ENV === ApplicationConstants.DEV_ENVIRONMENT_KEY
//           ? exception
//           : null,
//         CommonMethods.getErrorMsgCombinedString('SSO_1071').split(
//           ApplicationConstants.SEPARATOR_SYMBOL,
//         )[1],
//         'SSO_1071',
//       );
//     response.status(statusCode).json(errorResponseDto);
//   }
// }
