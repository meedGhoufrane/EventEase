import { Model } from 'mongoose';
import { Event, EventDocument } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventService {
    private eventModel;
    constructor(eventModel: Model<EventDocument>);
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
