import { Module } from '@nestjs/common';
import { ParkingCollectiveService } from './parking-collective.service';
import { ParkingCollectiveController } from './parking-collective.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingCollectiveSchema } from './schema/parking-colletive-schema';
import { ParkingCollective } from './schema/parking-colletive-schema';
import { ParkingCollectiveRepository } from './repositry/parking-collective.repo';
import { ProjectUnitModule } from '../project-unit/project-unit.module'; // Import the module containing ProjectUnitService
import { ProjectUnitService } from 'src/project-unit/project-unit.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ParkingCollective.name, schema: ParkingCollectiveSchema },
    ]),
    ProjectUnitModule, // Include the module containing ProjectUnitService
  ],
  controllers: [ParkingCollectiveController],
  providers: [
    ParkingCollectiveService,
    ParkingCollectiveRepository,
    ProjectUnitService,
  ],
})
export class ParkingCollectiveModule {}
