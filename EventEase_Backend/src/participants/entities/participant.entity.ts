import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ParticipantDocument = Participant & Document;

@Schema()
export class Participant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true }) 
  cin: string;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  event: Types.ObjectId;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);

ParticipantSchema.index({ email: 1 }, { unique: true });
ParticipantSchema.index({ cin: 1 }, { unique: true });
