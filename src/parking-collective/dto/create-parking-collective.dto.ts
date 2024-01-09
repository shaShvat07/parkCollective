import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  // ValidateNested,
  Max,
  Min,
} from 'class-validator';
import { CommonMethods } from '../../common/utils/common';
// import { Type } from 'class-transformer';

class ParkingLevel {
  @IsNotEmpty({ message: 'Parking Type is required' })
  @IsString({ message: 'Parking Type should be a string' })
  parkingType: string;

  @IsNotEmpty({ message: 'Is Covered is required' })
  @IsBoolean({ message: 'Is Covered should be a boolean' })
  isCovered: boolean;

  @IsNotEmpty({ message: 'Prefix is required' })
  @IsString({ message: 'Prefix should be a string' })
  prefix: string;

  @Max(1000, { message: 'Unit Count should be less than 1000' })
  @Min(1, { message: 'Unit Count should be greater than 0' })
  @IsNumber({}, { message: 'Unit Count should be a number' })
  @IsNotEmpty({ message: 'Unit Count is required' })
  unitCount: number;
}

// class SequencingEntry {
//   @IsDefined({ message: 'Sequencing Entry is required' })
//   @IsInstance(Map, { message: 'Sequencing Entry should be a Map' })
//   @ValidateNested({ each: true })
//   @Type(() => ParkingLevel)
//   levels: Map<string, ParkingLevel>;
// }

export class CreateParkingCollectiveDto {
  _id: string;

  @IsString({ message: 'Parking Level should be a string' })
  @IsNotEmpty({ message: 'Parking Level is required' })
  parkingLevel: string;

  @IsNotEmpty({ message: 'Attached to Building is required' })
  @IsBoolean({ message: 'Attached to Building should be a boolean' })
  isAttachedToBuilding: boolean;

  @IsNotEmpty({ message: 'Editing Locked is required' })
  @IsBoolean({ message: 'Editing Locked should be a boolean' })
  editingLocked: boolean;

  @IsNotEmpty({ message: 'Building ID is required' })
  @IsString({ message: 'Building ID should be a string' })
  buildingId: string;

  @IsNotEmpty({ message: 'Organization ID is required' })
  @IsString({ message: 'Organization ID should be a string' })
  orgId: string;

  @IsNotEmpty({ message: 'Project ID is required' })
  @IsString({ message: 'Project ID should be a string' })
  projectId: string;

  @IsNotEmpty({ message: 'Is Active is required' })
  @IsBoolean({ message: CommonMethods.getErrorMsgCombinedString('prjU_1001') })
  isActive: boolean;

  // @IsNotEmpty({ message: 'Sequencing is required' })
  // @ValidateNested({ each: true })
  // @Type(() => ParkingLevel)
  sequencing: { [key: string]: ParkingLevel };
}
