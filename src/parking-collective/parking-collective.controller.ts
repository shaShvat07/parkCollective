/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ParkingCollectiveService } from './parking-collective.service';
import { ParkingCollective } from './schema/parking-colletive-schema';
import { CreateParkingCollectiveDto } from './dto/create-parking-collective.dto';
import { UpdateParkingCollectiveDto } from './dto/update-parking-collective.dto';
import { validateAndTransformDto } from '../common/utils/validation-utils';
import { SuccessResponseDtoNew } from '../common/dtos/success-response-new.dto';
import { ChatGPTService } from '../chat-gpt/chat-gpt.service'; // Adjust the path
//path is passed on as a direct arg.
@Controller('parking-collective')
export class ParkingCollectiveController {
  constructor(
    private readonly parkingCollectiveService: ParkingCollectiveService,
    private readonly chatGPTService: ChatGPTService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Query('orgId') orgId: string,
    @Query('projectId') projectId: string,
    @Body() createParkingCollectiveDto: CreateParkingCollectiveDto,
  ) {
    console.log('Received DTO:', createParkingCollectiveDto);
    await validateAndTransformDto(
      CreateParkingCollectiveDto,
      createParkingCollectiveDto,
    );
    const parking = await this.parkingCollectiveService.create(
      orgId,
      projectId,
      createParkingCollectiveDto,
    );
    // const chatGPTResponse = await this.chatGPTService.getChatGPTResponse(
    //   'Your prompt to ChatGPT goes here',
    // );
    return SuccessResponseDtoNew.getFilledResponseObjectAllArgs(
      parking,
      'Parking Collective created successfully',
      null,
    );
  }

  @Get(':projectId')
  async findAll(
    @Param('projectId') projectId: string,
    @Query() query: { groupBy?: string },
  ) {
    const parking = await this.parkingCollectiveService.findAll(
      projectId,
      query,
    );
    return parking;
    // return SuccessResponseDtoNew.getPaginatedFilledResponseObjectAllArgs(
    //   parking,
    //   'All Parking Collective fetched successfully',
    //   null,
    // );
  }

  @Get(':orgId/:id')
  async findOne(@Param('orgId') orgId: string, @Param('id') id: string) {
    const parking = await this.parkingCollectiveService.findOne(orgId, id);
    return SuccessResponseDtoNew.getFilledResponseObjectAllArgs(
      parking,
      'Parking Collective fetched successfully',
      null,
    );
  }

  @Delete(':orgId/:id')
  async remove(@Param('orgId') orgId: string, @Param('id') id: string) {
    return this.parkingCollectiveService.remove(orgId, id);
  }

  @Patch(':orgId/:id')
  async update(
    @Param('orgId') orgId: string,
    @Param('id') id: string,
    @Body() updateParkingCollectiveDto: UpdateParkingCollectiveDto,
  ): Promise<ParkingCollective> {
    return this.parkingCollectiveService.update(
      orgId,
      id,
      updateParkingCollectiveDto,
    );
  }
}
