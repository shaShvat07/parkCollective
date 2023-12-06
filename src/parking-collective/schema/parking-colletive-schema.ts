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
}

export const ParkingCollectiveSchema = SchemaFactory.createForClass(ParkingCollective);