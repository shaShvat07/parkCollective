import { PartialType } from '@nestjs/mapped-types';
import { CreateParkingCollectiveDto } from './create-parking-collective.dto';

export class UpdateParkingCollectiveDto extends PartialType(CreateParkingCollectiveDto) {}
