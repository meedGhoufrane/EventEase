import { Document, Types } from 'mongoose';
export type ParticipantDocument = Participant & Document;
export declare class Participant {
    name: string;
    email: string;
    event: Types.ObjectId;
}
export declare const ParticipantSchema: import("mongoose").Schema<Participant, import("mongoose").Model<Participant, any, any, any, Document<unknown, any, Participant> & Participant & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Participant, Document<unknown, {}, import("mongoose").FlatRecord<Participant>> & import("mongoose").FlatRecord<Participant> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
