import { Model } from 'mongoose';
import { Participant, ParticipantDocument } from './entities/participant.entity';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
export declare class ParticipantService {
    private participantModel;
    constructor(participantModel: Model<ParticipantDocument>);
    create(createParticipantDto: CreateParticipantDto): Promise<Participant>;
    findAll(): Promise<Participant[]>;
    findOne(id: string): Promise<Participant>;
    update(id: string, updateParticipantDto: UpdateParticipantDto): Promise<Participant>;
}
