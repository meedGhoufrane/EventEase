import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Document } from 'mongoose';  // Import Document from mongoose
import { Event, EventDocument } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Participant } from '../participants/entities/participant.entity'; // Import Participant entity

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Participant.name) private participantModel: Model<Participant & Document>, // Ensure correct typing for Participant
  ) { }


  async addParticipants(eventId: string, participants: string[]): Promise<Event> {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with ID "${eventId}" not found`);
    }

    const participantIds = participants.map(id => new Types.ObjectId(id));
    event.participants.push(...participantIds);

    await event.save();
    return event;
  }

  async create(createEventDto: CreateEventDto): Promise<{ event: Event, message: string }> {
    const event = new this.eventModel(createEventDto);
    await event.save();

    if (createEventDto.participants && createEventDto.participants.length > 0) {
      const validParticipantIds = createEventDto.participants
        .map(id => new Types.ObjectId(id))
        .filter((id: Types.ObjectId) => Types.ObjectId.isValid(id));

      if (validParticipantIds.length === 0) {
        throw new NotFoundException('No valid participant IDs provided');
      }

      const participants = await this.participantModel
        .find({ '_id': { $in: validParticipantIds } })
        .exec();

      if (participants.length !== validParticipantIds.length) {
        throw new NotFoundException('One or more participants not found');
      }

      event.participants.push(...participants.map((participant) => participant._id as Types.ObjectId));
      await event.save();
    }

    return {
      event,
      message: 'Event created successfully',
    };
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel
      .find()
      .populate({
        path: 'participants',
        select: 'name email'
      })
      .exec();
  }

  async getEventById(eventId: string) {    
    const event = await this.eventModel
      .findById(eventId);
    
    if (!event) {
      throw new NotFoundException(`Event with ID "${eventId}" not found`);
    }
    const participants = await this.participantModel.find({event:event.id});

    
    
    return {event,participants};
  }
  

  async update(id: string, updateEventDto: UpdateEventDto): Promise<{ event: Event, message: string }> {
    const updatedEvent = await this.eventModel
      .findByIdAndUpdate(id, {
        ...updateEventDto,
        participants: updateEventDto.participants ? updateEventDto.participants.map(participantId => new Types.ObjectId(participantId)) : [],
      }, { new: true })
      .exec();

    if (!updatedEvent) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }

    return {
      event: updatedEvent,
      message: 'Event updated successfully',
    };
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.eventModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }

    return {
      message: 'Event deleted successfully',
    };
  }
}
