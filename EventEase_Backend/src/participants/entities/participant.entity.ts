import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Event } from '../../event/entities/event.entity'; 

export type ParticipantDocument = Participant & Document;

@Schema()
export class Participant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  event: Types.ObjectId; 
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
