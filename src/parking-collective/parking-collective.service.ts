/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateParkingCollectiveDto } from './dto/create-parking-collective.dto';
import { CommonMethods } from '../common/utils/common';
import { UpdateParkingCollectiveDto } from './dto/update-parking-collective.dto';
import { ParkingCollectiveRepository } from './repositry/parking-collective.repo';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ParkingCollectiveService {
  constructor(
    private readonly parkingCollectiveRepo: ParkingCollectiveRepository,
  ) {}
  logger: LoggerService = new LoggerService();
  async findAll(projectId: string, params: { groupBy?: string }) {
    if (params.groupBy) {
      const parking_unit = await this.parkingCollectiveRepo.findAll(projectId);
      if (!Object.keys(parking_unit).length) {
        throw new BadRequestException(
          CommonMethods.getErrorMsg(
            `No parking found with ProjectID : ${projectId}`,
          ),
        );
      }
      const groupedParking = await this.groupItemsByField(
        parking_unit,
        params.groupBy,
      );
      const groupedParkArray = Object.keys(groupedParking).map((key) => ({
        [params.groupBy]: key,
        items: groupedParking[key],
      }));
      return groupedParkArray;
    } else {
      const parking_unit = await this.parkingCollectiveRepo.findAll(projectId);
      if (!Object.keys(parking_unit).length) {
        throw new BadRequestException(
          CommonMethods.getErrorMsg(
            `No parking found with ProjectID : ${projectId}`,
          ),
        );
      }
      return parking_unit;
    }
  }

  async create(
    orgId: string,
    projectId: string,
    park: CreateParkingCollectiveDto,
  ) {
    await this.validateParkingTypeandNum(park);
    const parking = await this.parkingCollectiveRepo.create(
      orgId,
      projectId,
      park,
    );
    return parking;
  }

  async findOne(orgId: string, id: string) {
    const parking = await this.parkingCollectiveRepo.findOne(orgId, id);
    if (!parking) {
      throw new BadRequestException(
        CommonMethods.getErrorMsg('Parking not found'),
      );
    }
    return parking;
  }

  async remove(orgId: string, id: string) {
    const parking = await this.parkingCollectiveRepo.findOne(orgId, id);
    if (!parking) {
      throw new BadRequestException(
        CommonMethods.getErrorMsg('Parking not found'),
      );
    }
    const removedParking = await this.parkingCollectiveRepo.remove(id);
    if (!removedParking) {
      throw new BadRequestException(
        CommonMethods.getErrorMsg('Parking not removed'),
      );
    }
    return { message: `Parking Collective with ID ${id} removed successfully` };
  }

  async update(
    orgId: string,
    id: string,
    updateParkingCollectiveDto: UpdateParkingCollectiveDto,
  ) {
    const parking = await this.parkingCollectiveRepo.findOne(orgId, id);
    if (!parking) {
      throw new BadRequestException(
        CommonMethods.getErrorMsg('Parking not found'),
      );
    }
    const updatedParking = await this.parkingCollectiveRepo.update(
      id,
      updateParkingCollectiveDto,
    );
    if (!updatedParking) {
      throw new BadRequestException(
        CommonMethods.getErrorMsg('Parking not updated'),
      );
    }
    return updatedParking;
  }

  // VALIDATION CRITERIA
  private async validateProperty(
    value: any,
    expectedType: string,
    propName: string,
  ) {
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

  // item sort
  async groupItemsByField(items: any[], fieldName: string) {
    const groupedItems = new Map();
    for (const item of items) {
      const fieldValue = item[fieldName];

      if (!fieldValue) {
        throw new BadRequestException(CommonMethods.getErrorMsg('grp_1010'));
      }

      if (groupedItems.has(fieldValue)) {
        groupedItems.get(fieldValue).push(item);
      } else {
        groupedItems.set(fieldValue, [item]);
      }
    }
    return Object.fromEntries(groupedItems);
  }
}
