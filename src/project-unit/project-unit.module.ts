import { Module } from '@nestjs/common';
import { ProjectUnitService } from './project-unit.service';
import { ProjectUnitController } from './project-unit.controller';
import { ProjectUnitSchema } from './schemas/project-unit.schema';
import { ProjectUnitRepository } from './repository/project-unit.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProjectUnit', schema: ProjectUnitSchema },
    ]),
    HttpModule,
  ],
  controllers: [ProjectUnitController],
  providers: [ProjectUnitService, ProjectUnitRepository],
})
export class ProjectUnitModule {}
