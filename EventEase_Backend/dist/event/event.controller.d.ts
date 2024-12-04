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
    findOne(params: any, req: any): Promise<{
        event: import("mongoose").Document<unknown, {}, import("./entities/event.entity").EventDocument> & import("./entities/event.entity").Event & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        participants: (import("mongoose").Document<unknown, {}, import("../participants/entities/participant.entity").Participant & import("mongoose").Document<unknown, any, any>> & import("../participants/entities/participant.entity").Participant & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<{
        event: import("./entities/event.entity").Event;
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
