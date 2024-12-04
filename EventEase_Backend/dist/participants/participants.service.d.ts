import { Model } from 'mongoose';
import { Participant, ParticipantDocument } from './entities/participant.entity';
import { EventDocument } from '../event/entities/event.entity';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
export declare class ParticipantService {
    private participantModel;
    private eventModel;
    constructor(participantModel: Model<ParticipantDocument>, eventModel: Model<EventDocument>);
    create(createParticipantDto: CreateParticipantDto): Promise<Participant>;
    findAll(): Promise<Participant[]>;
    findOne(id: string): Promise<Participant>;
    update(id: string, updateParticipantDto: UpdateParticipantDto): Promise<Participant>;
}
