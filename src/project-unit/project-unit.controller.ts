import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProjectUnitService } from './project-unit.service';
import { CreateProjectUnitDto } from './dto/create-project-unit.dto';
import { UpdateProjectUnitDto } from './dto/update-project-unit.dto';
import { SuccessResponseDtoNew } from '../common/dtos/success-response-new.dto';
import { validateAndTransformDto } from '../common/utils/validation-utils';

@Controller({
  version: '1',
  path: 'organisations/:organisationId/projects/:projectId/units',
})
export class ProjectUnitController {
  constructor(private readonly projectUnitService: ProjectUnitService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Param('organisationId') organisationId: string,
    @Param('projectId') projectId: string,
    @Body() createProjectUnitDto: CreateProjectUnitDto,
  ) {
    await validateAndTransformDto(CreateProjectUnitDto, createProjectUnitDto);
    const project = await this.projectUnitService.create(
      organisationId,
      projectId,
      createProjectUnitDto,
    );
    return SuccessResponseDtoNew.getFilledResponseObjectAllArgs(
      project,
      'Project Unit created successfully',
      null,
    );
  }

  @Get()
  async findAll(
    @Param('projectId') projectId: string,
    @Query() query: { page?: number; limit?: number; groupBy?: string },
  ) {
    const projects = await this.projectUnitService.findAll(projectId, query);
    return SuccessResponseDtoNew.getPaginatedFilledResponseObjectAllArgs(
      projects,
      'Project Units fetched successfully',
      null,
    );
  }

  @Get(':id')
  async findOne(
    @Param('organisationId') organisationId: string,
    @Param('id') id: string,
  ) {
    const project = await this.projectUnitService.findOne(organisationId, id);
    return SuccessResponseDtoNew.getFilledResponseObjectAllArgs(
      project,
      'Project Unit fetched successfully',
      null,
    );
  }

  @Patch(':id')
  async update(
    @Param('organisationId') organisationId: string,
    @Param('id') id: string,
    @Body() updateProjectUnitDto: UpdateProjectUnitDto,
  ) {
    await validateAndTransformDto(UpdateProjectUnitDto, updateProjectUnitDto);
    const updatedProject = await this.projectUnitService.update(
      organisationId,
      id,
      updateProjectUnitDto,
    );
    return SuccessResponseDtoNew.getFilledResponseObjectAllArgs(
      updatedProject,
      'Project Unit updated successfully',
      null,
    );
  }

  @Delete(':id')
  async remove(
    @Param('organisationId') organisationId: string,
    @Param('id') id: string,
  ) {
    await this.projectUnitService.remove(organisationId, id);
    return SuccessResponseDtoNew.getFilledResponseObjectAllArgs(
      null,
      `Project Unit with ID ${id} has been deleted`,
      null,
    );
  }
}
