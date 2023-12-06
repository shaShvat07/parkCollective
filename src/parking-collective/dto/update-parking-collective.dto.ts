import { PartialType } from '@nestjs/swagger';
import { CreateParkingCollectiveDto } from './create-parking-collective.dto';

export class UpdateParkingCollectiveDto extends PartialType(
  CreateParkingCollectiveDto,
) {}
