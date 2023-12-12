import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  Max,
  Min,
  IsNumber,
  IsInt,
} from 'class-validator';
// import { CommonMethods } from 'src/common/utils/common';

export class CreateParkingCollectiveDto {
  @IsString({ message: 'Unit Name should be string' })
  @IsNotEmpty({ message: 'parking level required' })
  parkingLevel: string;
  @IsNotEmpty()
  @IsBoolean({ message: 'Unit Name should be Boolean' })
  isAttachedToBuilding: boolean;
  @IsNotEmpty()
  @IsBoolean({ message: 'Unit Name should be Boolean' })
  editingLocked: boolean;
  @IsNotEmpty()
  // @IsDecimal({}, { message: 'Unit Name should be Decimal' })
  @Min(0, { message: 'Unit Name should be greater than 0' })
  @Max(1000, { message: 'Unit Name should be less than 1000' })
  @IsNumber({}, { message: 'Unit Name should be number' })
  buildingId: number;
  @IsNotEmpty()
  @IsString({ message: 'Unit Name should be string' })
  orgId: string;
  @IsNotEmpty()
  @IsString({ message: 'Unit Name should be string' })
  projectId: string;
  @IsNotEmpty()
  @IsBoolean({ message: 'Unit Name should be Boolean' })
  isActive: boolean;
  sequencing: Record<string, SequencingEntry>;
}

export class SequencingEntry {
  @IsNotEmpty()
  @IsString({ message: 'Unit Name should be string' })
  parkingType: string;

  @IsNotEmpty()
  @IsBoolean({ message: 'Unit Name should be Boolean' })
  isCovered: boolean;

  @IsNotEmpty()
  @IsString({ message: 'Unit Name should be string' })
  prefix: string;

  // @IsInt({ message: CommonMethods.getErrorMsgCombinedString('parC_1003') })
  @IsNotEmpty({ message: 'Number cannot be empty' })
  @IsInt({ message: 'Invalid number' })
  unitCount: number;
}
