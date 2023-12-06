import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty()
  data: object;
  @ApiProperty()
  message: string;
  @ApiProperty()
  code: string;

  static getFilledResponseObjectAllArgs(
    dataPassed: object,
    messagePassed: string,
    codePassed: string,
  ) {
    const errorResponseDto: ErrorResponseDto = new ErrorResponseDto();
    errorResponseDto.data = dataPassed;
    errorResponseDto.message = messagePassed;
    errorResponseDto.code = codePassed;
    return errorResponseDto;
  }
}
