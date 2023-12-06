import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ParkingCollective } from './schema/parking-colletive-schema';
import { CreateParkingCollectiveDto } from './dto/create-parking-collective.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class ParkingCollectiveService {
  constructor(
    @InjectModel(ParkingCollective.name)
    private ParkingCollectiveModel: mongoose.Model<ParkingCollective>,
  ) {}

  async findAll(): Promise<ParkingCollective[]> {
    const parkingCollective = await this.ParkingCollectiveModel.find();
    return parkingCollective;
  }

  async create(park: CreateParkingCollectiveDto): Promise<ParkingCollective> {
    const res = await this.ParkingCollectiveModel.create(park);
    return res;
  }
}
