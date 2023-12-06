import { Module } from '@nestjs/common';
import { ParkingCollectiveService } from './parking-collective.service';
import { ParkingCollectiveController } from './parking-collective.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingCollectiveSchema } from './schema/parking-colletive-schema';
import { ParkingCollective } from './schema/parking-colletive-schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ParkingCollective.name, schema: ParkingCollectiveSchema },
    ]),
  ],
  controllers: [ParkingCollectiveController],
  providers: [ParkingCollectiveService],
})
export class ParkingCollectiveModule {}
