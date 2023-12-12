import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProjectUnitDto } from './dto/create-project-unit.dto';
import { UpdateProjectUnitDto } from './dto/update-project-unit.dto';
import { CommonMethods } from '../common/utils/common';
import { LoggerService } from '../logger/logger.service';
import { ProjectUnitRepository } from './repository/project-unit.repo';

@Injectable()
export class ProjectUnitService {
  constructor(private readonly projectUnitRepository: ProjectUnitRepository) {}

  logger: LoggerService = new LoggerService();

  async create(
    orgId: string,
    projectId: string,
    createProjectUnitDto: CreateProjectUnitDto,
  ) {
    await this.validateNestedProperties(createProjectUnitDto);
    await this.validateIfExistingUserByProjectName(createProjectUnitDto);
    await this.validateUnitType(
      createProjectUnitDto.unitType,
      createProjectUnitDto.interiors,
    );
    const projectUnit = await this.projectUnitRepository.create(
      orgId,
      projectId,
      createProjectUnitDto,
    );
    return projectUnit;
  }

  async findAll(
    projectId: string,
    params: { page?: number; limit?: number; groupBy?: string },
  ) {
    if (params.groupBy) {
      const project_unit = await this.projectUnitRepository.findAll(
        projectId,
        params,
      );
      const projectUnit = project_unit.data;
      const groupedUsers = await CommonMethods.groupItemsByField(
        projectUnit,
        params.groupBy,
      );

      const groupedUsersArray = Object.keys(groupedUsers).map((key) => ({
        [params.groupBy]: key,
        items: groupedUsers[key],
      }));
      return { data: groupedUsersArray };
    } else {
      return await this.projectUnitRepository.findAll(projectId, params);
    }
  }

  async findOne(orgId: string, id: string) {
    const projectUnit = await this.projectUnitRepository.findOne(orgId, id);
    if (!projectUnit) {
      throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1008'));
    }
    return projectUnit;
  }

  async update(
    orgId: string,
    id: string,
    updateProjectUnitDto: UpdateProjectUnitDto,
  ) {
    const projectUnit = await this.projectUnitRepository.findOne(orgId, id);
    if (!projectUnit) {
      throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1008'));
    }
    await this.validateNestedUpdateProperties(updateProjectUnitDto);
    await this.validateIfChangedProjectNameAlreadyExists(
      updateProjectUnitDto,
      id,
    );

    const updatedObj = this.deepMerge(projectUnit, updateProjectUnitDto);

    const updatedProject = await this.projectUnitRepository.update(
      id,
      updatedObj,
    );
    if (!updatedProject) {
      throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1008'));
    }
    return updatedProject;
  }

  private deepMerge(target: any, source: any): any {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (source[key] instanceof Object && !Array.isArray(source[key])) {
          if (!target[key]) {
            target[key] = {};
          }
          target[key] = this.deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  }

  async remove(orgId: string, id: string) {
    const project = await this.projectUnitRepository.findOne(orgId, id);
    if (!project) {
      throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1008'));
    }
    const removedProject = await this.projectUnitRepository.remove(id);
    if (!removedProject) {
      throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1008'));
    }
    return { message: `Project Unit with ID ${id} has been deleted` };
  }

  private async validateIfExistingUserByProjectName(
    createProjectUnitDto: CreateProjectUnitDto,
  ) {
    const existingProjectName = await this.projectUnitRepository.findByName(
      createProjectUnitDto.unitName,
    );
    if (existingProjectName) {
      throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1009'));
    }
  }

  private async validateNestedProperties(
    createProjectUnitDto: CreateProjectUnitDto,
  ) {
    if (Object.keys(createProjectUnitDto.unitName).length === 0) {
      throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1001'));
    }

    if (createProjectUnitDto.BuildupArea) {
      if (createProjectUnitDto.BuildupArea.length > 8) {
        throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1005'));
      }
    } else {
      throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1005'));
    }

    if (createProjectUnitDto.CarpetArea) {
      if (createProjectUnitDto.CarpetArea.length > 8) {
        throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1004'));
      }
    } else {
      throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1004'));
    }

    if (createProjectUnitDto.superBuildupArea) {
      if (createProjectUnitDto.superBuildupArea.length > 8) {
        throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1003'));
      }
    } else {
      throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1003'));
    }
    if (!createProjectUnitDto.unitType) {
      throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1002'));
    }
  }

  private async validateNestedUpdateProperties(
    updateProjectUnitDto: UpdateProjectUnitDto,
  ) {
    if (Object.keys(updateProjectUnitDto.unitName).length === 0) {
      throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1001'));
    }

    if (updateProjectUnitDto.BuildupArea) {
      if (updateProjectUnitDto.BuildupArea.length > 8) {
        throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1005'));
      }
    }

    if (updateProjectUnitDto.CarpetArea) {
      if (updateProjectUnitDto.CarpetArea.length > 8) {
        throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1004'));
      }
    }

    if (updateProjectUnitDto.superBuildupArea) {
      if (updateProjectUnitDto.superBuildupArea.length > 8) {
        throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1003'));
      }
    }
  }

  private async validateIfChangedProjectNameAlreadyExists(
    updateProjectUnitDto: UpdateProjectUnitDto,
    projectUnitId: string,
  ) {
    const existingProjectName = await this.projectUnitRepository.findByName(
      updateProjectUnitDto.unitName,
    );
    if (existingProjectName && existingProjectName.id !== projectUnitId) {
      throw new BadRequestException(CommonMethods.getErrorMsg('prjU_1009'));
    }
  }

  private async validateUnitType(unitType, interiors) {
    if (Object.keys(interiors).length == 0) {
      throw new BadRequestException(CommonMethods.getErrorMsg('ut_1008'));
    }
    if (
      (unitType === '1RK' && Object.keys(interiors).length < 4) ||
      Object.keys(interiors).length > 7
    ) {
      throw new BadRequestException(CommonMethods.getErrorMsg('ut_1004'));
    } else if (
      (unitType === '1BHK' && Object.keys(interiors).length < 4) ||
      Object.keys(interiors).length > 8
    ) {
      throw new BadRequestException(CommonMethods.getErrorMsg('ut_1005'));
    } else if (
      (unitType === '1.5BHK' && Object.keys(interiors).length < 4) ||
      Object.keys(interiors).length > 8
    ) {
      throw new BadRequestException(CommonMethods.getErrorMsg('ut_1006'));
    } else if (
      (unitType === '2BHK' && Object.keys(interiors).length < 6) ||
      Object.keys(interiors).length > 10
    ) {
      throw new BadRequestException(CommonMethods.getErrorMsg('ut_1007'));
    } else if (
      (unitType === '2.5BHK' && Object.keys(interiors).length < 6) ||
      Object.keys(interiors).length > 10
    ) {
      throw new BadRequestException(CommonMethods.getErrorMsg('ut_1009'));
    } else if (
      (unitType === '3BHK' && Object.keys(interiors).length < 8) ||
      Object.keys(interiors).length > 14
    ) {
      throw new BadRequestException(CommonMethods.getErrorMsg('ut_1010'));
    } else if (
      (unitType === '3.5BHK' && Object.keys(interiors).length < 8) ||
      Object.keys(interiors).length > 14
    ) {
      throw new BadRequestException(CommonMethods.getErrorMsg('ut_1011'));
    } else if (
      (unitType === '4BHK' && Object.keys(interiors).length < 10) ||
      Object.keys(interiors).length > 16
    ) {
      throw new BadRequestException(CommonMethods.getErrorMsg('ut_1012'));
    }
  }
}
