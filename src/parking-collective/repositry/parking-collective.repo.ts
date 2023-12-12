/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ParkingCollective } from '../schema/parking-colletive-schema';
import { CreateParkingCollectiveDto } from '../dto/create-parking-collective.dto';
import { UpdateParkingCollectiveDto } from '../dto/update-parking-collective.dto';
@Injectable()
export class ParkingCollectiveRepository {
  constructor(
    @InjectModel('ParkingCollective')
    private readonly parkingcollectiveModel: Model<ParkingCollective>,
  ) {}

  async create(
    orgId: string,
    projectId: string,
    createPark: CreateParkingCollectiveDto,
  ) {
    createPark.orgId = orgId;
    createPark.projectId = projectId;
    const parking = new this.parkingcollectiveModel(createPark);
    const savedParking = await parking.save();
    return savedParking;
  }

  async findAll(projectId: string) {
    const result = await this.parkingcollectiveModel.find({
      isActive: true,
      projectId,
    });
    return result;
  }

  async findOne(orgId: string, id: string) {
      const parking = await this.parkingcollectiveModel
        .findOne({ _id: id, orgId, isActive: true })
        .exec();
      return parking;
  }

  async update(id: string, updatePark: UpdateParkingCollectiveDto) {
    const parking = await this.parkingcollectiveModel.findByIdAndUpdate(
      id,
      updatePark,
      { new: true },
    );
    return parking;
  }

  async remove(id: string) {
    return await this.parkingcollectiveModel
      .findByIdAndUpdate(id, { $set: { isActive: false } }, { new: true })
      .exec();
  }
}
