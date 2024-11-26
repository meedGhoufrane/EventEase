import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Participant, ParticipantDocument } from './entities/participant.entity'; // Correct import
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel(Participant.name) private participantModel: Model<ParticipantDocument>, 
  ) {}

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    const participant = new this.participantModel(createParticipantDto);
    return participant.save();
  }

  async findAll(): Promise<Participant[]> {
    return this.participantModel.find().populate('event').exec(); 
  }

  async findOne(id: string): Promise<Participant> {
    const participant = await this.participantModel.findById(id).populate('event').exec();
    if (!participant) {
      throw new NotFoundException(`Participant with ID "${id}" not found`);
    }
    return participant;
  }

  async update(id: string, updateParticipantDto: UpdateParticipantDto): Promise<Participant> {
    const updatedParticipant = await this.participantModel
      .findByIdAndUpdate(id, updateParticipantDto, { new: true })
      .populate('event')
      .exec();
    if (!updatedParticipant) {
      throw new NotFoundException(`Participant with ID "${id}" not found`);
    }
    return updatedParticipant;
  }

  
}
