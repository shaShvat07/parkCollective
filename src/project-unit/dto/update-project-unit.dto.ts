import { PartialType } from '@nestjs/swagger';
import { CreateProjectUnitDto } from './create-project-unit.dto';

export class UpdateProjectUnitDto extends PartialType(CreateProjectUnitDto) {}
