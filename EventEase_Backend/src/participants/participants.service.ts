import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Participant, ParticipantDocument } from './entities/participant.entity';
import { Event, EventDocument } from '../event/entities/event.entity'; // Import Event
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel(Participant.name) private participantModel: Model<ParticipantDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>, // Inject EventModel here
  ) { }

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    // Step 1: Create a new participant
    const participant = new this.participantModel(createParticipantDto);
    const savedParticipant = await participant.save();
  
    // Step 2: Retrieve the event by the provided event ID
    const event = await this.eventModel.findById(createParticipantDto.event);
    if (!event) {
      throw new NotFoundException(`Event with ID "${createParticipantDto.event}" not found`);
    }
  
    event.participants.push(savedParticipant._id as Types.ObjectId); // Use Types.ObjectId to cast the ID
  
    await event.save();
  
    return savedParticipant;
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
