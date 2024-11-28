import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Participant, ParticipantDocument } from './entities/participant.entity';
import { Event, EventDocument } from '../event/entities/event.entity'; 
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel(Participant.name) private participantModel: Model<ParticipantDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>, 
  ) { }

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    const { email, cin } = createParticipantDto;
  
    const existingParticipant = await this.participantModel.findOne({
      $or: [{ email }, { cin }],
    });
  
    if (existingParticipant) {
      if (existingParticipant.email === email && existingParticipant.cin === cin) {
        throw new ConflictException('Email and CIN already exist');
      } else if (existingParticipant.email === email) {
        throw new ConflictException('Email already exists');
      } else if (existingParticipant.cin === cin) {
        throw new ConflictException('CIN already exists');
      }
    }
  
    try {
      const participant = new this.participantModel(createParticipantDto);
      const savedParticipant = await participant.save();
  
      const event = await this.eventModel.findById(createParticipantDto.event);
      if (!event) {
        throw new NotFoundException(`Event with ID "${createParticipantDto.event}" not found`);
      }
  
      event.participants.push(savedParticipant._id as Types.ObjectId);
      await event.save();
  
      return savedParticipant;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Duplicate key error');
      }
      throw error;
    }
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
    const { event: newEventId } = updateParticipantDto;
  
    const existingParticipant = await this.participantModel.findById(id).exec();
    if (!existingParticipant) {
      throw new NotFoundException(`Participant with ID "${id}" not found`);
    }
  
    const oldEventId = existingParticipant.event; 
  
    if (newEventId && oldEventId && newEventId !== oldEventId.toString()) {
      const oldEvent = await this.eventModel.findById(oldEventId).exec();
      if (oldEvent) {
        oldEvent.participants = oldEvent.participants.filter(
          (participantId) => participantId.toString() !== id
        );
        await oldEvent.save();
      }
  
      const newEvent = await this.eventModel.findById(newEventId).exec();
      if (!newEvent) {
        throw new NotFoundException(`Event with ID "${newEventId}" not found`);
      }
  
      newEvent.participants.push(existingParticipant._id as Types.ObjectId);
      await newEvent.save();
    }
  
    const updatedParticipant = await this.participantModel
      .findByIdAndUpdate(id, updateParticipantDto, { new: true })
      .populate('event')
      .exec();
  
    return updatedParticipant;
  }
  

  async remove(id: string): Promise<Participant> {
    const participant = await this.participantModel.findById(id).exec();
  
    if (!participant) {
      throw new NotFoundException(`Participant with ID "${id}" not found`);
    }
  
    if (participant.event) {
      const event = await this.eventModel.findById(participant.event);
      if (event) {
        event.participants = event.participants.filter(
          (participantId) => participantId.toString() !== id
        );
        await event.save();
      }
    }
  
    await this.participantModel.findByIdAndDelete(id).exec();
  
    return participant; 
  }
  
}
