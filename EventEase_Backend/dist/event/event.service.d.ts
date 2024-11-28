import { Model, Document } from 'mongoose';
import { Event, EventDocument } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Participant } from '../participants/entities/participant.entity';
export declare class EventService {
    private eventModel;
    private participantModel;
    constructor(eventModel: Model<EventDocument>, participantModel: Model<Participant & Document>);
    addParticipants(eventId: string, participants: string[]): Promise<Event>;
    create(createEventDto: CreateEventDto): Promise<{
        event: Event;
        message: string;
    }>;
    findAll(): Promise<Event[]>;
    findOne(id: string): Promise<Event>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<{
        event: Event;
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
