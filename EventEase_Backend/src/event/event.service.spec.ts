import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
<<<<<<< HEAD
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
=======
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
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
      });

      const result = await service.update(mockObjectId.toString(), updateEventDto);

      expect(result).toEqual({
        event: updatedEvent,
<<<<<<< HEAD
        message: 'Event updated successfully',
=======
        message: 'Event updated successfully'
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
      });
    });

    it('should throw NotFoundException if event not found during update', async () => {
<<<<<<< HEAD
      mockEventModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(
        service.update(mockObjectId.toString(), { name: 'Updated Event' }),
      ).rejects.toThrow(NotFoundException);
=======
      mockEventModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null)
      });

      await expect(service.update(mockObjectId.toString(), {}))
        .rejects.toThrow(NotFoundException);
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
    });
  });

  describe('remove', () => {
    it('should delete an event successfully', async () => {
<<<<<<< HEAD
      mockEventModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockEvent),
=======
      mockEventModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: mockObjectId })
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
      });

      const result = await service.remove(mockObjectId.toString());

      expect(result).toEqual({
<<<<<<< HEAD
        message: 'Event deleted successfully',
=======
        message: 'Event deleted successfully'
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
      });
    });

    it('should throw NotFoundException if event not found during deletion', async () => {
<<<<<<< HEAD
      mockEventModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.remove(mockObjectId.toString())).rejects.toThrow(
        NotFoundException,
      );
=======
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
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
    });
  });
});
