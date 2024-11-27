import { Types } from 'mongoose';
export declare class CreateEventDto {
    name: string;
    description: string;
    date: Date;
    location: string;
    participants: Types.ObjectId[];
    maxParticipants: number;
}
