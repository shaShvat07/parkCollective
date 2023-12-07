import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
// import { CommonMethods } from 'src/common/utils/common';

export class CreateParkingCollectiveDto {
  @IsNotEmpty()
  @IsString({ message: 'Unit Name should be string' })
  parkingLevel: string;
  @IsNotEmpty()
  @IsBoolean({ message: 'Unit Name should be Boolean' })
  isAttachedToBuilding: boolean;
  @IsNotEmpty()
  @IsBoolean({ message: 'Unit Name should be Boolean' })
  editingLocked: boolean;
  @IsNotEmpty()
  @IsString({ message: 'Unit Name should be string' })
  buildingId: string;
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
  @IsNotEmpty()
  unitCount: number;
}
