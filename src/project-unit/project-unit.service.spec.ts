import { Test, TestingModule } from '@nestjs/testing';
import { ProjectUnitService } from './project-unit.service';
import { ProjectUnitRepository } from './repository/project-unit.repo';

describe('ProjectUnitService', () => {
  let service: ProjectUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectUnitService,
        {
          provide: ProjectUnitRepository,
          useFactory: () => ({}),
        },
      ],
    }).compile();

    service = module.get<ProjectUnitService>(ProjectUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
