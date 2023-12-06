import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ParkingCollectiveService } from './parking-collective.service';
import { ParkingCollective } from './schema/parking-colletive-schema';
import { CreateParkingCollectiveDto } from './dto/create-parking-collective.dto';
import { UpdateParkingCollectiveDto } from './dto/update-parking-collective.dto';
//path is passed on as a direct arg.
@Controller('parking-collective')
export class ParkingCollectiveController {
  constructor(
    private readonly parkingCollectiveService: ParkingCollectiveService,
  ) {}

  @Post()
  async create(@Body() createParkingCollectiveDto: CreateParkingCollectiveDto) {
    // console.log('Received DTO:', createParkingCollectiveDto);
    return this.parkingCollectiveService.create(createParkingCollectiveDto);
  }

  @Get()
  async getAllPark(): Promise<ParkingCollective[]> {
    return this.parkingCollectiveService.findAll();
  }

  @Get(':id')
  async getOnePark(@Param('id') id: string): Promise<ParkingCollective> {
    return this.parkingCollectiveService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.parkingCollectiveService.remove(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateParkingCollectiveDto: UpdateParkingCollectiveDto,
  ): Promise<ParkingCollective> {
    return this.parkingCollectiveService.update(id, updateParkingCollectiveDto);
  }
}
