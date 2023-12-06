import { IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class RoomDimensions {
  @ApiProperty()
  lengthFeet: string;

  @ApiProperty()
  lengthInches: string;

  @ApiProperty()
  widthFeet: string;

  @ApiProperty()
  widthInches: string;
}
export class CreateProjectUnitDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @IsString()
  unitName: string;

  @ApiProperty()
  @IsString()
  unitImgUrl: string;

  @ApiProperty()
  @IsString()
  unitType: string;

  @ApiProperty()
  superBuildupArea: string;

  @ApiProperty()
  BuildupArea: string;

  @ApiProperty()
  CarpetArea: string;

  @ApiProperty()
  orgId: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  @ValidateNested()
  interiors: { [key: string]: RoomDimensions };
}
