import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    create(createEventDto: CreateEventDto): Promise<{
        event: import("./entities/event.entity").Event;
        message: string;
    }>;
    findAll(): Promise<import("./entities/event.entity").Event[]>;
    findOne(id: string): Promise<import("./entities/event.entity").Event>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<{
        event: import("./entities/event.entity").Event;
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
