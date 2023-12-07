import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ParkingCollective } from './schema/parking-colletive-schema';
import { CreateParkingCollectiveDto } from './dto/create-parking-collective.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as mongoose from 'mongoose';
import { CommonMethods } from 'src/common/utils/common';
import { UpdateParkingCollectiveDto } from './dto/update-parking-collective.dto';
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
    await this.validateParkingTypeandNum(park);
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
  async update(
    id: string,
    updateParkingCollectiveDto: UpdateParkingCollectiveDto,
  ): Promise<ParkingCollective> {
    const parking = await this.ParkingCollectiveModel.findById(id);
    if (!parking) {
      throw new BadRequestException(
        CommonMethods.getErrorMsg('Parking not found'),
      );
    }
    return this.ParkingCollectiveModel.findByIdAndUpdate(
      id,
      updateParkingCollectiveDto,
      { new: true },
    );
  }

  // VALIDATION CRITERIA
  private validateProperty(value: any, expectedType: string, propName: string) {
    //Empty data check
    if (value === undefined || value === null || value === '') {
      throw new BadRequestException(
        CommonMethods.getErrorMsg(`${propName} is required`),
      );
    }
    //Type check
    if (typeof value !== expectedType) {
      throw new BadRequestException(
        CommonMethods.getErrorMsg(
          `${propName} should be of type ${expectedType}`,
        ),
      );
    }
  }

  private validateUnitCount(unitCount: number, propName: string) {
    if (isNaN(unitCount) || unitCount < 0 || unitCount > 1000) {
      throw new BadRequestException(
        CommonMethods.getErrorMsg(
          `${propName} should be a number between 0 and 1000`,
        ),
      );
    }
  }

  private async validateParkingTypeandNum(
    createPark: CreateParkingCollectiveDto,
  ) {
    // this.validateProperty(createPark.parkingLevel, 'string', 'Parking level');
    // this.validateProperty(
    //   createPark.isAttachedToBuilding,
    //   'boolean',
    //   'isAttachedToBuilding',
    // );
    // this.validateProperty(createPark.editingLocked, 'boolean', 'editingLocked');
    // this.validateProperty(createPark.buildingId, 'string', 'buildingId');
    // this.validateProperty(createPark.orgId, 'string', 'orgId');
    // this.validateProperty(createPark.projectId, 'string', 'projectId');
    // this.validateProperty(createPark.isActive, 'boolean', 'isActive');
    // this.validateProperty(createPark.sequencing, 'object', 'sequencing');

    // Additional validation for the sequencing map
    Object.keys(createPark.sequencing).forEach((key) => {
      const entry = createPark.sequencing[key];
      this.validateProperty(entry, 'object', `sequencing > level: ${key}`);
      this.validateProperty(
        entry.parkingType,
        'string',
        `sequencing > level: ${key} > parkingType`,
      );
      this.validateProperty(
        entry.isCovered,
        'boolean',
        `sequencing > level: ${key} > isCovered`,
      );
      this.validateProperty(
        entry.prefix,
        'string',
        `sequencing > level: ${key} > prefix`,
      );
      this.validateUnitCount(entry.unitCount, `sequencing.${key}.unitCount`);
    });
  }
}
