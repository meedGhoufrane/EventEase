import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { getModelToken } from '@nestjs/mongoose';
import { Event } from './entities/event.entity';
import { Participant } from '../participants/entities/participant.entity';
import { Model, Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';

describe('EventService', () => {
  let service: EventService;
  let eventModel: Model<Event>;
  let participantModel: Model<Participant>;

  const mockObjectId = new Types.ObjectId();

  const mockEvent = {
    _id: mockObjectId,
    name: 'Test Event',
    description: 'Test Description',
    date: new Date(),
    location: 'Test Location',
    participants: [],
    maxParticipants: 100,
    save: jest.fn(),
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  const mockParticipant = {
    _id: new Types.ObjectId(),
    name: 'Test Participant',
    email: 'test@example.com',
    cin: 'ABC123',
    event: mockObjectId,
  };

  const mockEventModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    constructor: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
  };

  const mockParticipantModel = {
    find: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getModelToken(Event.name),
          useValue: mockEventModel,
        },
        {
          provide: getModelToken(Participant.name),
          useValue: mockParticipantModel,
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    eventModel = module.get<Model<Event>>(getModelToken(Event.name));
    participantModel = module.get<Model<Participant>>(getModelToken(Participant.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });  

    
  describe('findAll', () => {
    it('should return all events', async () => {
      mockEventModel.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([mockEvent]),
      });

      const result = await service.findAll();

      expect(result).toEqual([mockEvent]);
      expect(eventModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single event', async () => {
      mockEventModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockEvent),
      });

      const result = await service.findOne(mockObjectId.toString());

      expect(result).toEqual(mockEvent);
    });

    it('should throw NotFoundException if event not found', async () => {
      mockEventModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne(mockObjectId.toString())).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update an event successfully', async () => {
      const updateEventDto = {
        name: 'Updated Event',
        description: 'Updated Description',
      };

      const updatedEvent = { ...mockEvent, ...updateEventDto };

      mockEventModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedEvent),
      });

      const result = await service.update(mockObjectId.toString(), updateEventDto);

      expect(result).toEqual({
        event: updatedEvent,
        message: 'Event updated successfully',
      });
    });

    it('should throw NotFoundException if event not found during update', async () => {
      mockEventModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(
        service.update(mockObjectId.toString(), { name: 'Updated Event' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete an event successfully', async () => {
      mockEventModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockEvent),
      });

      const result = await service.remove(mockObjectId.toString());

      expect(result).toEqual({
        message: 'Event deleted successfully',
      });
    });

    it('should throw NotFoundException if event not found during deletion', async () => {
      mockEventModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.remove(mockObjectId.toString())).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
