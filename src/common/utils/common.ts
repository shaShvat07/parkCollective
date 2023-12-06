import { ErrorMessages } from './error-messages';
import { ApplicationConstants } from '../application-contants';
import { ErrorResponseDto } from '../dtos/error-response.dto';
// import { LoggerService } from '../../logger/logger.service';
import { BadRequestException } from '@nestjs/common';

const countryCodes = ['91', '+91'];

// const logger: LoggerService = new LoggerService();
export const CommonMethods = {
  getErrorMsg(code: string) {
    return ErrorResponseDto.getFilledResponseObjectAllArgs(
      null,
      ErrorMessages[code],
      code,
    );
  },

  isValidCountryCode(code: string) {
    return countryCodes.includes(code);
  },
  getErrorMsgWithVariableArguments(code: string, replaceableArgument: string) {
    const stringFormed = ErrorMessages[code].replace(
      /:.*[^ ] /,
      replaceableArgument,
    );
    // logger.debug(
    //   'getErrorMsgWithVariableArguments String Formed = ' + stringFormed,
    // );
    return ErrorResponseDto.getFilledResponseObjectAllArgs(
      null,
      stringFormed,
      code,
    );
  },

  getErrorMsgWithDebugData(code: string, debugData: object = null) {
    return ErrorResponseDto.getFilledResponseObjectAllArgs(
      debugData,
      ErrorMessages[code],
      code,
    );
  },

  getErrorMsgCombinedString(code: string): string {
    return `${code}:- ${ErrorMessages[code]}`;
  },

  getApplicationConstant(code: string) {
    return `${ApplicationConstants[code]}`;
  },

  async validateName(name: string) {
    const namePattern: RegExp = new RegExp(
      ApplicationConstants.ALPHABETS_REGEX,
    );
    return namePattern.test(name);
  },

  async validateAlphaNumericName(name: string) {
    const namePattern: RegExp = new RegExp(
      ApplicationConstants.ALPHANUMERICS_REGEX,
    );
    return namePattern.test(name);
  },

  async groupItemsByField(items: any[], fieldName: string) {
    const groupedItems = {};

    for (const item of items) {
      if (!(fieldName in item)) {
        throw new BadRequestException(CommonMethods.getErrorMsg('grp_1010'));
      }
      const fieldValue = item[fieldName];

      if (groupedItems[fieldValue]) {
        groupedItems[fieldValue].push(item);
      } else {
        groupedItems[fieldValue] = [item];
      }
    }
    return groupedItems;
  },

  async groupMapItemsByField(items, field) {
    return items.reduce((acc, item) => {
      const fieldValue = this.getField(item, field);
      if (!acc[fieldValue]) {
        acc[fieldValue] = [];
      }
      acc[fieldValue].push(item);
      return acc;
    }, {});
  },

  // Define a function to get the value of a nested field
  getField(obj, field) {
    const fields = field.split('.');
    return fields.reduce((acc, currentField) => {
      return acc[currentField];
    }, obj);
  },
};
