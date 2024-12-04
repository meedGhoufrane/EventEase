import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Participant } from '../participants/entities/participant.entity';
import { Types } from 'mongoose';

describe('EventService', () => {
  let service: EventService;
  let mockEventModel: any;
  let mockParticipantModel: any;

  const mockObjectId = new Types.ObjectId();

  beforeEach(async () => {
    mockEventModel = {
      findById: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      populate: jest.fn(),
      exec: jest.fn(),
    };

    mockParticipantModel = {
      find: jest.fn(),
      exec: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        { provide: getModelToken(Event.name), useValue: mockEventModel },
        { provide: getModelToken(Participant.name), useValue: mockParticipantModel },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an event successfully', async () => {
      const createEventDto = {
        name: 'Test Event',
        description: 'Test Description',
        date: new Date(),
        location: 'Test Location',
        participants: [mockObjectId],
        maxParticipants: 100
      };

      const savedEvent = { ...createEventDto, _id: mockObjectId };
      mockEventModel.save = jest.fn().mockResolvedValue(savedEvent);
      mockParticipantModel.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([{ _id: mockObjectId }])
      });

      const result = await service.create(createEventDto);

      expect(result).toEqual({
        event: savedEvent,
        message: 'Event created successfully'
      });
    });

    it('should throw NotFoundException when participants are invalid', async () => {
      const createEventDto = {
        name: 'Test Event',
        description: 'Test Description',
        date: new Date(),
        location: 'Test Location',
        participants: [mockObjectId],
        maxParticipants: 100
      };

      mockParticipantModel.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([])
      });

      await expect(service.create(createEventDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all events', async () => {
      const mockEvents = [
        { name: 'Event 1', participants: [] },
        { name: 'Event 2', participants: [] }
      ];

      mockEventModel.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockEvents)
        })
      });

      const result = await service.findAll();
      expect(result).toEqual(mockEvents);
    });
  });

  describe('getEventById', () => {
    it('should return an event by id', async () => {
      const mockEvent = {
        _id: mockObjectId,
        name: 'Test Event',
        participants: []
      };

      mockEventModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue(mockEvent)
      });

      const result = await service.getEventById(mockObjectId.toString());
      expect(result).toEqual(mockEvent);
    });

    it('should throw NotFoundException if event not found', async () => {
      mockEventModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue(null)
      });

      await expect(service.getEventById(mockObjectId.toString()))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an event successfully', async () => {
      const updateEventDto = {
        name: 'Updated Event',
        description: 'Updated Description'
      };

      const updatedEvent = {
        _id: mockObjectId,
        ...updateEventDto
      };

      mockEventModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedEvent)
      });

      const result = await service.update(mockObjectId.toString(), updateEventDto);

      expect(result).toEqual({
        event: updatedEvent,
        message: 'Event updated successfully'
      });
    });

    it('should throw NotFoundException if event not found during update', async () => {
      mockEventModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null)
      });

      await expect(service.update(mockObjectId.toString(), {}))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete an event successfully', async () => {
      mockEventModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: mockObjectId })
      });

      const result = await service.remove(mockObjectId.toString());

      expect(result).toEqual({
        message: 'Event deleted successfully'
      });
    });

    it('should throw NotFoundException if event not found during deletion', async () => {
      mockEventModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null)
      });

      await expect(service.remove(mockObjectId.toString()))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('addParticipants', () => {
    it('should add participants to an event successfully', async () => {
      const mockEvent = {
        _id: mockObjectId,
        participants: [],
        save: jest.fn().mockResolvedValue({
          _id: mockObjectId,
          participants: [new Types.ObjectId()]
        })
      };

      mockEventModel.findById = jest.fn().mockResolvedValue(mockEvent);

      const result = await service.addParticipants(
        mockObjectId.toString(),
        [new Types.ObjectId().toString()]
      );

      expect(result.participants).toBeDefined();
      expect(mockEvent.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if event not found when adding participants', async () => {
      mockEventModel.findById = jest.fn().mockResolvedValue(null);

      await expect(
        service.addParticipants(mockObjectId.toString(), [new Types.ObjectId().toString()])
      ).rejects.toThrow(NotFoundException);
    });
  });
});
