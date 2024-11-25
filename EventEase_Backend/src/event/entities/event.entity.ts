import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    location: string;

    @Prop({ type: [Types.ObjectId], ref: 'Participant', default: [] })
    participants: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: 'Auth', required: true })
    createdBy: Types.ObjectId;

}

export const EventSchema = SchemaFactory.createForClass(Event);
