import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'project_unit', timestamps: true })
export class ProjectUnit extends Document {
  @Prop({ default: () => uuidv4(), type: String })
  _id: string;

  @Prop()
  unitName: string;

  @Prop()
  unitImgUrl: string;

  @Prop()
  unitType: string;

  @Prop()
  superBuildupArea: number;

  @Prop()
  BuildupArea: number;

  @Prop()
  CarpetArea: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  orgId: string;

  @Prop()
  projectId: string;

  @Prop({
    type: Map,
    of: {
      lengthFeet: String,
      lengthInches: String,
      widthFeet: String,
      widthInches: String,
    },
    _id: false,
  })
  interiors: Map<
    string,
    {
      lengthFeet: string;
      lengthInches: string;
      widthFeet: string;
      widthInches: string;
    }
  >;
}

export const ProjectUnitSchema = SchemaFactory.createForClass(ProjectUnit);

ProjectUnitSchema.pre('save', function (next) {
  this.isActive = true;
  next();
});
