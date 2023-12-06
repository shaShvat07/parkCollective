import { Test, TestingModule } from '@nestjs/testing';
import { ParkingCollectiveController } from './parking-collective.controller';
import { ParkingCollectiveService } from './parking-collective.service';

describe('ParkingCollectiveController', () => {
  let controller: ParkingCollectiveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingCollectiveController],
      providers: [ParkingCollectiveService],
    }).compile();

    controller = module.get<ParkingCollectiveController>(
      ParkingCollectiveController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
