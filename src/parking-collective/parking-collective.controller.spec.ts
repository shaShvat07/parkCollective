import { Test, TestingModule } from '@nestjs/testing';
import { ParkingCollectiveController } from './parking-collective.controller';
import { ParkingCollectiveService } from './parking-collective.service';
import { createMock } from '@golevelup/ts-jest';
import { ParkingCollectiveRepository } from './repositry/parking-collective.repo';
import { CreateParkingCollectiveDto } from './dto/create-parking-collective.dto';
import { UpdateParkingCollectiveDto } from './dto/update-parking-collective.dto';
import { SuccessResponseDtoNew } from '../common/dtos/success-response-new.dto';
import { CommonMethods } from '../common/utils/common';
import { BadRequestException } from '@nestjs/common';
// import { LoggerService } from '../logger/logger.service';

describe('ParkingCollectiveController', () => {
  const orgID = 'dew123';
  const projectID = 'abcde';
  let controller: ParkingCollectiveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingCollectiveController],
      providers: [
        ParkingCollectiveService,
        {
          provide: ParkingCollectiveRepository,
          useFactory: () => ({
            create: jest.fn(() => Promise.resolve(newParkingCollective)),
            findAll: jest.fn(() =>
              Promise.resolve([
                newParkingCollective,
                existingParkingCollective,
              ]),
            ),
            findOne: jest.fn(() => Promise.resolve(existingParkingCollective)),
            update: jest.fn(() => Promise.resolve(updateOrgDto)),
            remove: jest.fn(() => Promise.resolve(updateOrgDto)),
          }),
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<ParkingCollectiveController>(
      ParkingCollectiveController,
    );
  });

  it('create Parking Collective', async () => {
    const result: SuccessResponseDtoNew = await controller.create(
      orgID,
      projectID,
      newParkingCollective,
    );
    expect(result.data.items).toEqual(newParkingCollective);
  });

  it('find Project Unit by id', async () => {
    const result: SuccessResponseDtoNew = await controller.findOne(
      orgID,
      'exampleParking123',
    );
    expect(result.data.items['_id']).toEqual(existingParkingCollective._id);
  });

  it('update Parking Collective', async () => {
    const updateDto: UpdateParkingCollectiveDto = {
      parkingLevel: 'H2',
    };

    const result = await controller.update(
      orgID,
      'exampleParking123',
      updateDto,
    );
    expect(result).toEqual(updateOrgDto);
  });

  it('remove Parking Collective', async () => {
    const idToDelete = 'e8a8e603-2c01-4323-8b7c-8d91fdb91da9';

    const result = await controller.remove(orgID, idToDelete);

    expect(result.message).toEqual(
      `Parking Collective with ID ${idToDelete} removed successfully`,
    );
  });

  it('create Parking Collective', async () => {
    const result = await controller.create(orgID, projectID, invalidParking);
    expect(result.message).toEqual('Is Active should be a boolean');
  });

  it('create Parking Collective', async () => {
    try {
      await controller.create(orgID, projectID, invalidParking);
      fail('Expected BadRequestException but no exception was thrown');
    } catch (error) {
      if (error instanceof BadRequestException) {
        expect(error.getResponse().data).toContain(
          'Is Active should be a boolean',
        );
      } else {
        throw error;
      }
    }
  });
});

const newParkingCollective = new CreateParkingCollectiveDto();
newParkingCollective._id = 'exampleParking123';
newParkingCollective.parkingLevel = 'P1';
newParkingCollective.isAttachedToBuilding = true;
newParkingCollective.editingLocked = true;
newParkingCollective.buildingId = 'buildingXYZ';
newParkingCollective.orgId = 'organization789';
newParkingCollective.projectId = 'project123';
newParkingCollective.isActive = true;
newParkingCollective.sequencing = {
  level1: {
    parkingType: '15',
    isCovered: false,
    prefix: '12',
    unitCount: 12,
  },
};

const existingParkingCollective = new CreateParkingCollectiveDto();
existingParkingCollective._id = 'exampleParking123';
existingParkingCollective.parkingLevel = 'P1';
existingParkingCollective.isAttachedToBuilding = true;
existingParkingCollective.editingLocked = true;
existingParkingCollective.buildingId = 'buildingXYZ';
existingParkingCollective.orgId = 'organization789';
existingParkingCollective.projectId = 'project123';
existingParkingCollective.isActive = true;
existingParkingCollective.sequencing = {
  level1: {
    parkingType: '15',
    isCovered: false,
    prefix: '12',
    unitCount: 12,
  },
};

const updateOrgDto = new UpdateParkingCollectiveDto();
updateOrgDto._id = 'exampleParking123';
updateOrgDto.parkingLevel = 'P1';
updateOrgDto.isAttachedToBuilding = true;
updateOrgDto.editingLocked = true;
updateOrgDto.buildingId = 'buildingXYZ';
updateOrgDto.orgId = 'organization789';
updateOrgDto.projectId = 'project123';
updateOrgDto.isActive = true;
updateOrgDto.sequencing = {
  level1: {
    parkingType: '15',
    isCovered: false,
    prefix: '12',
    unitCount: 12,
  },
};

function createUserDto(
  _id,
  parkingLevel,
  isAttachedToBuilding,
  editingLocked,
  buildingId,
  orgId,
  projectId,
  isActive,
  sequencing,
) {
  const userDto = new CreateParkingCollectiveDto();
  userDto._id = _id;
  userDto.parkingLevel = parkingLevel;
  userDto.isAttachedToBuilding = isAttachedToBuilding;
  userDto.editingLocked = editingLocked;
  userDto.buildingId = buildingId;
  userDto.orgId = orgId;
  userDto.projectId = projectId;
  userDto.isActive = isActive;
  userDto.sequencing = sequencing;
  return userDto;
}

const invalidParking = createUserDto(
  'exampleParking123',
  'P1',
  true,
  true,
  'buildingXYZ',
  'organization789',
  'project123',
  12,
  {
    level1: {
      parkingType: '15',
      isCovered: false,
      prefix: '12',
      unitCount: 12,
    },
  },
);

describe('ParkingCollectiveController', () => {
  let controller: ParkingCollectiveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingCollectiveController],
      providers: [
        ParkingCollectiveService,
        {
          provide: ParkingCollectiveRepository,
          useFactory: () => ({}),
        },
      ],
    }).compile();
    controller = module.get<ParkingCollectiveController>(
      ParkingCollectiveController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
