import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Participant } from '../../participants/entities/participant.entity'; 

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  location: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Participant' }] })
  participants: Types.ObjectId[];
  

  @Prop({ required: true })
  maxParticipants: number; 
}

export const EventSchema = SchemaFactory.createForClass(Event);

export type EventDocument = Event & Document;
