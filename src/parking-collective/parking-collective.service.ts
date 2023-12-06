import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ParkingCollective } from './schema/parking-colletive-schema';
import { CreateParkingCollectiveDto } from './dto/create-parking-collective.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as mongoose from 'mongoose';
import { CommonMethods } from 'src/common/utils/common';
// import { UpdateParkingCollectiveDto } from './dto/update-parking-collective.dto';
@Injectable()
export class ParkingCollectiveService {
  constructor(
    @InjectModel(ParkingCollective.name)
    private ParkingCollectiveModel: mongoose.Model<ParkingCollective>,
    @InjectConnection() private connection: Connection,
  ) {}

  async findAll(): Promise<ParkingCollective[]> {
    const parkingCollective = await this.ParkingCollectiveModel.find();
    return parkingCollective;
  }

  async create(park: CreateParkingCollectiveDto): Promise<ParkingCollective> {
    const parking = new this.ParkingCollectiveModel(park);
    return parking.save();
  }

  async findOne(id: string): Promise<ParkingCollective> {
    const parking = await this.ParkingCollectiveModel.findById(id);
    if (!parking) {
      throw new BadRequestException(
        CommonMethods.getErrorMsg('Parking not found'),
      );
    }
    return parking;
  }

  async remove(id: string) {
    const parking = await this.ParkingCollectiveModel.findById(id);
    if (!parking) {
      throw new BadRequestException(
        CommonMethods.getErrorMsg('Parking not found'),
      );
    }
    const removedParking =
      await this.ParkingCollectiveModel.findByIdAndDelete(id);
    if (!removedParking) {
      throw new BadRequestException(
        CommonMethods.getErrorMsg('Parking not removed'),
      );
    }
    return { message: `Parking unit with ID ${id} removed successfully` };
  }
  // async update(
  //   id: string,
  //   updateParkingCollectiveDto: UpdateParkingCollectiveDto,
  // ): Promise<ParkingCollective> {
  //   const parking = await this.ParkingCollectiveModel.findById(id);
  //   if (!parking) {
  //     throw new BadRequestException(
  //       CommonMethods.getErrorMsg('Parking not found'),
  //     );
  //   }
  //   return this.ParkingCollectiveModel.findByIdAndUpdate(
  //     id,
  //     updateParkingCollectiveDto,
  //     { new: true },
  //   );
  // }
}
