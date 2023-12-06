import { Test, TestingModule } from '@nestjs/testing';
import { ParkingCollectiveService } from './parking-collective.service';

describe('ParkingCollectiveService', () => {
  let service: ParkingCollectiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingCollectiveService],
    }).compile();

    service = module.get<ParkingCollectiveService>(ParkingCollectiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
