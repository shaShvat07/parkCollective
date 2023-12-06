import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectUnit } from '../schemas/project-unit.schema';
import { CreateProjectUnitDto } from '../dto/create-project-unit.dto';
import { UpdateProjectUnitDto } from '../dto/update-project-unit.dto';

@Injectable()
export class ProjectUnitRepository {
  constructor(
    @InjectModel('ProjectUnit')
    private readonly projectunitModel: Model<ProjectUnit>,
  ) {}

  async create(
    orgId: string,
    projectId: string,
    createProjectUnitDto: CreateProjectUnitDto,
  ) {
    createProjectUnitDto.orgId = orgId;
    createProjectUnitDto.projectId = projectId;
    const projectUnit = new this.projectunitModel(createProjectUnitDto);
    const savedProjectUnit = await projectUnit.save();
    return savedProjectUnit;
  }

  async findAll(projectId: string, params: { page?: number; limit?: number }) {
    const page = params.page || 1;
    const limit = params.limit || 10;

    const query = this.projectunitModel.find({ isActive: true, projectId });

    const result = await query
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.projectunitModel
      .countDocuments({ isActive: true, projectId })
      .exec();

    return {
      page,
      limit,
      total,
      data: result,
    };
  }

  async findOne(orgId: string, id: string) {
    const projectUnit = await this.projectunitModel
      .findOne({ _id: id, orgId, isActive: true })
      .exec();
    return projectUnit;
  }

  async update(id: string, updateProjectUnitDto: UpdateProjectUnitDto) {
    const updatedProjectUnit = await this.projectunitModel.findByIdAndUpdate(
      id,
      updateProjectUnitDto,
      { new: true },
    );
    return updatedProjectUnit;
  }

  async remove(id: string) {
    return await this.projectunitModel
      .findByIdAndUpdate(id, { $set: { isActive: false } }, { new: true })
      .exec();
  }

  async findByName(unitName: string) {
    const user = await this.projectunitModel.findOne({ unitName }).exec();
    return user;
  }
}
