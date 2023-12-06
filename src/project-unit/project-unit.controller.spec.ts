import { Test, TestingModule } from '@nestjs/testing';
import { ProjectUnitController } from './project-unit.controller';
import { ProjectUnitService } from './project-unit.service';
import { createMock } from '@golevelup/ts-jest';
import { ProjectUnitRepository } from './repository/project-unit.repo';
import { CreateProjectUnitDto } from './dto/create-project-unit.dto';
import { UpdateProjectUnitDto } from './dto/update-project-unit.dto';
import { SuccessResponseDto } from '../common/dtos/success-response.dto';

describe('ProjectUnitController', () => {
  const organisationId = '4999c9f1-93d3-43c9-9958-53974df7ad32';
  const projectId = '5058298d-23d8-4fd8-8520-cf7f71cd7046';
  let controller: ProjectUnitController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectUnitController],
      providers: [
        ProjectUnitService,
        {
          provide: ProjectUnitRepository,
          useFactory: () => ({
            create: jest.fn(() => Promise.resolve(newProjectUnit)),
            findAll: jest.fn(() =>
              Promise.resolve([newProjectUnit, existingProjectUnit]),
            ),
            findOne: jest.fn(() => Promise.resolve(newProjectUnit)),
            update: jest.fn(() => Promise.resolve(updateOrgDto)),
            remove: jest.fn(() => Promise.resolve(updateOrgDto)),
          }),
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<ProjectUnitController>(ProjectUnitController);
  });

  it('create Project Unit', async () => {
    const result: SuccessResponseDto = await controller.create(
      organisationId,
      projectId,
      newProjectUnit,
    );
    expect(result.data).toEqual(newProjectUnit);
  });

  it('find all Project Units', async () => {
    const query = { page: 1, limit: 10, keyword: 'test' };
    const result = await controller.findAll(organisationId, query);
    expect(result.message).toEqual('Success in fetching Project Units');
    // expect(result.data).toEqual([newProjectUnit, existingProjectUnit]);
  });

  it('find Project Unit by id', async () => {
    const result: SuccessResponseDto = await controller.findOne(
      organisationId,
      'e8a8e603-2c01-4323-8b7c-8d91fdb91da9',
    );
    expect(result.data['_id']).toEqual(existingProjectUnit._id);
  });

  it('update Project Unit', async () => {
    const updateDto: UpdateProjectUnitDto = {
      unitName: 'Updated Project Units',
    };

    const result: SuccessResponseDto = await controller.update(
      organisationId,
      'e8a8e603-2c01-4323-8b7c-8d91fdb91da9',
      updateDto,
    );
    expect(result.data).toEqual(updateOrgDto);
  });

  it('remove Project Unit', async () => {
    const idToDelete = 'e8a8e603-2c01-4323-8b7c-8d91fdb91da9';

    const result = await controller.remove(organisationId, idToDelete);

    expect(result.message).toEqual(
      `Project Unit with ID ${idToDelete} has been deleted.`,
    );
  });
});

const newProjectUnit = new CreateProjectUnitDto();
newProjectUnit._id = 'e8a8e603-2c01-4323-8b7c-8d91fdb91da9';
newProjectUnit.unitName = 'Test Project Unit';
newProjectUnit.unitImgUrl = 'https://example.com/unit_img.png';
newProjectUnit.unitType = '1RK';
newProjectUnit.superBuildupArea = '202';
newProjectUnit.BuildupArea = '202';
newProjectUnit.CarpetArea = '202';
newProjectUnit.superBuildupArea = '202';
newProjectUnit.interiors = {
  Room: {
    lengthFeet: '15',
    lengthInches: '15',
    widthFeet: '12',
    widthInches: '12',
  },
  kitchen: {
    lengthFeet: '10',
    lengthInches: '10',
    widthFeet: '8',
    widthInches: '8',
  },
  washroom: {
    lengthFeet: '12',
    lengthInches: '12',
    widthFeet: '10',
    widthInches: '10',
  },
  bedroom: {
    lengthFeet: '11',
    lengthInches: '11',
    widthFeet: '9',
    widthInches: '9',
  },
};

const existingProjectUnit = new CreateProjectUnitDto();
existingProjectUnit._id = 'e8a8e603-2c01-4323-8b7c-8d91fdb91da9';
existingProjectUnit.unitName = 'Test Project Unit';
existingProjectUnit.unitImgUrl = 'https://example.com/unit_img.png';
existingProjectUnit.unitType = '1RK';
existingProjectUnit.superBuildupArea = '202';
existingProjectUnit.BuildupArea = '202';
existingProjectUnit.CarpetArea = '202';
existingProjectUnit.superBuildupArea = '202';
existingProjectUnit.interiors = {
  Room: {
    lengthFeet: '15',
    lengthInches: '15',
    widthFeet: '12',
    widthInches: '12',
  },
  kitchen: {
    lengthFeet: '10',
    lengthInches: '10',
    widthFeet: '8',
    widthInches: '8',
  },
  washroom: {
    lengthFeet: '12',
    lengthInches: '12',
    widthFeet: '10',
    widthInches: '10',
  },
  bedroom: {
    lengthFeet: '11',
    lengthInches: '11',
    widthFeet: '9',
    widthInches: '9',
  },
};

const updateOrgDto = new UpdateProjectUnitDto();
existingProjectUnit._id = 'e8a8e603-2c01-4323-8b7c-8d91fdb91da9';
existingProjectUnit.unitName = 'Test Project Unit';
existingProjectUnit.unitImgUrl = 'https://example.com/unit_img.png';
existingProjectUnit.unitType = '1RK';
existingProjectUnit.superBuildupArea = '202';
existingProjectUnit.BuildupArea = '202';
existingProjectUnit.CarpetArea = '202';
existingProjectUnit.superBuildupArea = '202';
existingProjectUnit.interiors = {
  Room: {
    lengthFeet: '15',
    lengthInches: '15',
    widthFeet: '12',
    widthInches: '12',
  },
  kitchen: {
    lengthFeet: '10',
    lengthInches: '10',
    widthFeet: '8',
    widthInches: '8',
  },
  washroom: {
    lengthFeet: '12',
    lengthInches: '12',
    widthFeet: '10',
    widthInches: '10',
  },
  bedroom: {
    lengthFeet: '11',
    lengthInches: '11',
    widthFeet: '9',
    widthInches: '9',
  },
};

describe('ProjectUnitController', () => {
  let controller: ProjectUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectUnitController],
      providers: [
        ProjectUnitService,
        {
          provide: ProjectUnitRepository,
          useFactory: () => ({}),
        },
      ],
    }).compile();

    controller = module.get<ProjectUnitController>(ProjectUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
