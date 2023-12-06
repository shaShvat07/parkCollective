import { Controller, Get, Post, Body } from '@nestjs/common';
import { ParkingCollectiveService } from './parking-collective.service';
import { ParkingCollective } from './schema/parking-colletive-schema';
import { CreateParkingCollectiveDto } from './dto/create-parking-collective.dto';
//path is passed on as a direct arg.
@Controller('parking-collective')
export class ParkingCollectiveController {
  constructor(
    private readonly parkingCollectiveService: ParkingCollectiveService,
  ) {}

  @Post()
  async createPark(
    @Body() createParkingCollectiveDto: CreateParkingCollectiveDto,
  ): Promise<ParkingCollective> {
    return this.parkingCollectiveService.create(createParkingCollectiveDto);
  }

  @Get()
  async getAllPark(): Promise<ParkingCollective[]> {
    return this.parkingCollectiveService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.parkingCollectiveService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateParkingCollectiveDto: UpdateParkingCollectiveDto,
  // ) {
  //   return this.parkingCollectiveService.update(
  //     +id,
  //     updateParkingCollectiveDto,
  //   );
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.parkingCollectiveService.remove(+id);
  // }
}

// function findAll() {
//   throw new Error('Function not implemented.');
// }
