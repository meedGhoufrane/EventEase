import { Document, Types } from 'mongoose';
export declare class Event extends Document {
    name: string;
    description: string;
    date: Date;
    location: string;
    participants: Types.ObjectId[];
    maxParticipants: number;
}
export declare const EventSchema: import("mongoose").Schema<Event, import("mongoose").Model<Event, any, any, any, Document<unknown, any, Event> & Event & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Event, Document<unknown, {}, import("mongoose").FlatRecord<Event>> & import("mongoose").FlatRecord<Event> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export type EventDocument = Event & Document;
