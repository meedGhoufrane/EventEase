import { Document } from 'mongoose';
export type ParticipantDocument = Participant & Document;
export declare class Participant {
    name: string;
    email: string;
    phone: string;
    event: string;
}
export declare const ParticipantSchema: import("mongoose").Schema<Participant, import("mongoose").Model<Participant, any, any, any, Document<unknown, any, Participant> & Participant & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Participant, Document<unknown, {}, import("mongoose").FlatRecord<Participant>> & import("mongoose").FlatRecord<Participant> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
