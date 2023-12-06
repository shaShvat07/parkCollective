import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty()
  data: object;
  @ApiProperty()
  message: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  pageNumber: number;
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  totalNumItems: number;

  static getFilledResponseObjectAllArgs(
    dataPassed: object,
    messagePassed: string,
    codePassed: string,
  ): SuccessResponseDto {
    // return this.getFilledResponseObjectAllArgs(dataPassed, messagePassed, null);
    const successResponseDto: SuccessResponseDto = new SuccessResponseDto();
    successResponseDto.data = dataPassed;
    successResponseDto.message = messagePassed;
    successResponseDto.code = codePassed;
    return successResponseDto;
  }

  static getPaginatedFilledResponseObjectAllArgs(
    paginatedFetchedResult: any,
    messagePassed: string,
    codePassed: string,
  ) {
    const successResponseDto: SuccessResponseDto = new SuccessResponseDto();
    successResponseDto.message = messagePassed;
    successResponseDto.code = codePassed;
    successResponseDto.data = paginatedFetchedResult.data;
    successResponseDto.pageSize = paginatedFetchedResult.limit;
    successResponseDto.pageNumber = paginatedFetchedResult.page;
    successResponseDto.totalNumItems = paginatedFetchedResult.total;
    return successResponseDto;
  }
}
