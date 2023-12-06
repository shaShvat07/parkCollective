import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsNotEmptyNested(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    // Use 'object' type instead of 'Object'
    registerDecorator({
      name: 'isNotEmptyNested',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      async: true,
      validator: {
        async validate(value: any) {
          const hasEmptyValues = (obj: any): boolean => {
            if (typeof obj === 'object' && obj !== null) {
              for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                  if (obj[key] === '' || hasEmptyValues(obj[key])) {
                    return true;
                  }
                }
              }
            }
            return false;
          };

          return !hasEmptyValues(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should not have empty nested properties`;
        },
      },
    });
  };
}

@ValidatorConstraint({ name: 'isAlphabetic', async: false })
export class IsAlphabeticConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    const alphabeticRegex = /^[A-Za-z\s]+$/;
    return alphabeticRegex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    const propertyName = args.property;
    return `${propertyName} should contain only alphabetic characters and spaces.`;
  }
}

export function IsAlphabetic(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAlphabeticConstraint,
    });
  };
}

export function MaxLengthIfPresent(
  property: string,
  length: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'maxLengthIfPresent',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          return !(relatedValue && value && value.length > length);
        },
      },
    });
  };
}
