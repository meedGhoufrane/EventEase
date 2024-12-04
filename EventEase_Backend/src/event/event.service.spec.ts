import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from './entities/event.entity';
import { Participant } from '../participants/entities/participant.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

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
    participants: [] as Types.ObjectId[],
    maxParticipants: 100,
    save: jest.fn().mockResolvedValue(this),
  };

  const mockParticipant = {
    _id: new Types.ObjectId(),
    name: 'John Doe',
    email: 'john@example.com',
    event: mockObjectId,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getModelToken(Event.name),
          useValue: {
            constructor: jest.fn().mockResolvedValue(mockEvent),
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            exec: jest.fn(),
            populate: jest.fn(),
          },
        },
        {
          provide: getModelToken(Participant.name),
          useValue: {
            find: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    eventModel = module.get<Model<Event>>(getModelToken(Event.name));
    participantModel = module.get<Model<Participant>>(getModelToken(Participant.name));
  });


  describe('findAll', () => {
    it('should return all events', async () => {
      const events = [mockEvent];
      jest.spyOn(eventModel, 'find').mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(events),
        }),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual(events);
    });
  });

  describe('getEventById', () => {
    it('should return an event and its participants', async () => {
      jest.spyOn(eventModel, 'findById').mockResolvedValue(mockEvent as any);
      jest.spyOn(participantModel, 'find').mockResolvedValue([mockParticipant] as any);

      const result = await service.getEventById(mockObjectId.toString());
      expect(result.event).toBeDefined();
      expect(result.participants).toBeDefined();
    });

    it('should throw NotFoundException if event not found', async () => {
      jest.spyOn(eventModel, 'findById').mockResolvedValue(null);

      await expect(
        service.getEventById(mockObjectId.toString())
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const updateEventDto: UpdateEventDto = {
        name: 'Updated Event',
      };

      jest.spyOn(eventModel, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockEvent),
      } as any);

      const result = await service.update(mockObjectId.toString(), updateEventDto);
      expect(result.event).toBeDefined();
      expect(result.message).toBe('Event updated successfully');
    });

    it('should throw NotFoundException if event not found during update', async () => {
      jest.spyOn(eventModel, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(
        service.update(mockObjectId.toString(), {})
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an event', async () => {
      jest.spyOn(eventModel, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockEvent),
      } as any);

      const result = await service.remove(mockObjectId.toString());
      expect(result.message).toBe('Event deleted successfully');
    });

    it('should throw NotFoundException if event not found during removal', async () => {
      jest.spyOn(eventModel, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(
        service.remove(mockObjectId.toString())
      ).rejects.toThrow(NotFoundException);
    });
  });
});