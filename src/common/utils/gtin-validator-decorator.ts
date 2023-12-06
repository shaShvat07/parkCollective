import { registerDecorator, ValidationOptions } from 'class-validator';

export function CustomGSTNValidation(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'CustomGSTNValidation',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isValidGSTNumber(value);
        },
      },
    });
  };
}

function validatePattern(gstin: string) {
  const gstinRegexPattern =
    /^([0-2][0-9]|[3][0-8])[A-Z]{3}[ABCFGHLJPTK][A-Z]\d{4}[A-Z][A-Z0-9][Z][A-Z0-9]$/;
  return gstinRegexPattern.test(gstin);
}

function isValidGSTNumber(gstin: string) {
  gstin = gstin.toUpperCase();
  if (gstin.length !== 15) {
    return false;
  }
  if (validatePattern(gstin)) {
    return gstin[14] === calcCheckSum(gstin.toUpperCase());
  }
  return false;
}

function calcCheckSum(gstin: string) {
  const GSTN_CODEPOINT_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let factor = 2;
  let sum = 0;
  let checkCodePoint = 0;
  const mod = GSTN_CODEPOINT_CHARS.length;
  let i;

  for (i = gstin.length - 2; i >= 0; i--) {
    let codePoint = -1;
    for (let j = 0; j < GSTN_CODEPOINT_CHARS.length; j++) {
      if (GSTN_CODEPOINT_CHARS[j] === gstin[i]) {
        codePoint = j;
      }
    }
    let digit = factor * codePoint;
    factor = factor === 2 ? 1 : 2;
    digit = Math.floor(digit / mod) + (digit % mod);
    sum += digit;
  }
  checkCodePoint = (mod - (sum % mod)) % mod;
  return GSTN_CODEPOINT_CHARS[checkCodePoint];
}
