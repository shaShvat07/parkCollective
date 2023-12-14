/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'project_collective', timestamps: true })
export class ParkingCollective extends Document {
  @Prop({ default: () => uuidv4(), type: String })
  _id: string;

  @Prop()
  parkingLevel: string;

  @Prop({ default: true })
  isAttachedToBuilding: boolean;

  @Prop({ default: false })
  editingLocked: boolean;

  @Prop()
  buildingId: string;
  
  @Prop()
  orgId: string;
  
  @Prop()
  projectUnitId: string;
  
  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    type: Map,
    of: {
      parkingType: String,
      isCovered: Boolean,
      prefix: String,
      unitCount: Number,
    },
    _id: false,
  })
  sequencing: Map<
    string,
    {
      parkingType: string;
      isCovered: boolean;
      prefix: string;
      unitCount: number;
    }
  >;
}

export const ParkingCollectiveSchema = SchemaFactory.createForClass(ParkingCollective);