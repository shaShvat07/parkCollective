// project-unit.module.ts
import { Module } from '@nestjs/common';
import { ProjectUnitRepository } from './repository/project-unit.repo'; // Adjust the path
import { ProjectUnitService } from './project-unit.service';
import { ProjectUnitController } from './project-unit.controller';
import { ProjectUnitSchema } from './schemas/project-unit.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProjectUnit', schema: ProjectUnitSchema },
    ]),
  ],
  controllers: [ProjectUnitController],
  providers: [ProjectUnitService, ProjectUnitRepository],
  exports: [ProjectUnitRepository], // Export the repository here
})
export class ProjectUnitModule {}
