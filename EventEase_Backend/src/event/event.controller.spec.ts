import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
<<<<<<< HEAD
=======
import { BadRequestException } from '@nestjs/common';
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
import { Types } from 'mongoose';

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  const mockObjectId = new Types.ObjectId();

<<<<<<< HEAD
  const mockEvent = {
    _id: mockObjectId,
    name: 'Test Event',
    description: 'Test Description',
    date: new Date(),
    location: 'Test Location',
    participants: [],
    maxParticipants: 100
  };

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an event', async () => {
      const createDto: CreateEventDto = {
        name: 'Test Event',
        description: 'Test Description',
        date: new Date(),
        location: 'Test Location',
        maxParticipants: 100,
        participants: []
      };

      const expectedResponse = {
        event: mockEvent,
        message: 'Event created successfully'
      };

      mockService.create.mockResolvedValue(expectedResponse);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle creation errors', async () => {
      const createDto: CreateEventDto = {
        name: 'Test Event',
        description: 'Test Description',
        date: new Date(),
        location: 'Test Location',
        maxParticipants: 100,
        participants: []
      };

      const error = new Error('Creation failed');
      mockService.create.mockRejectedValue(error);

      await expect(controller.create(createDto)).rejects.toThrow(error);
    });
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      mockService.findAll.mockResolvedValue([mockEvent]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockEvent]);
    });
  });

  describe('findOne', () => {
    it('should return a single event', async () => {
      const id = mockObjectId.toHexString();
      mockService.findOne.mockResolvedValue(mockEvent);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockEvent);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const id = mockObjectId.toHexString();
      const updateDto: UpdateEventDto = {
        name: 'Updated Event',
        description: 'Updated Description',
        location: 'Updated Location'
      };

      const expectedResponse = {
        event: { ...mockEvent, ...updateDto },
        message: 'Event updated successfully'
      };

      mockService.update.mockResolvedValue(expectedResponse);

      const result = await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(id, updateDto);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('remove', () => {
    it('should delete an event', async () => {
      const id = mockObjectId.toHexString();
      const expectedResponse = { message: 'Event deleted successfully' };

      mockService.remove.mockResolvedValue(expectedResponse);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedResponse);
=======
  beforeEach(async () => {
    const mockEventService = {
      create: jest.fn(),
      findAll: jest.fn(),
      getEventById: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        { provide: EventService, useValue: mockEventService },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an event successfully', async () => {
      const createEventDto: CreateEventDto = {
        name: 'Test Event',
        description: 'Test Description',
        date: new Date(),
        location: 'Test Location',
        participants: [mockObjectId],
        maxParticipants: 100
      };
      
      const expectedResult = {
        event: { ...createEventDto, _id: mockObjectId },
        message: 'Event created successfully'
      };

      // @ts-ignore
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createEventDto);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createEventDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const expectedEvents = [
        {
          _id: mockObjectId,
          name: 'Event 1',
          description: 'Description 1',
          date: new Date(),
          location: 'Location 1',
          participants: [],
          maxParticipants: 100
        }
      ];

      // @ts-ignore
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedEvents);

      const result = await controller.findAll();
      expect(result).toEqual(expectedEvents);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an event by id', async () => {
      const eventId = mockObjectId.toString();
      const expectedEvent = {
        _id: mockObjectId,
        name: 'Event 1',
        description: 'Description 1',
        date: new Date(),
        location: 'Location 1',
        participants: [],
        maxParticipants: 100
      };

      // @ts-ignore
      jest.spyOn(service, 'getEventById').mockResolvedValue(expectedEvent);

      const result = await controller.findOne({ id: eventId }, { params: { id: eventId } });
      expect(result).toEqual(expectedEvent);
      expect(service.getEventById).toHaveBeenCalledWith(eventId);
    });

    it('should throw BadRequestException for invalid ObjectId', async () => {
      const invalidId = 'invalid-id';

      await expect(
        controller.findOne({ id: invalidId }, { params: { id: invalidId } })
      ).rejects.toThrow(BadRequestException);
      
      expect(service.getEventById).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an event successfully', async () => {
      const eventId = mockObjectId.toString();
      const updateEventDto: UpdateEventDto = {
        name: 'Updated Event',
        description: 'Updated Description'
      };

      const expectedResult = {
        event: { ...updateEventDto, _id: mockObjectId },
        message: 'Event updated successfully'
      };

      // @ts-ignore
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

      const result = await controller.update(eventId, updateEventDto);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(eventId, updateEventDto);
    });
  });

  describe('remove', () => {
    it('should remove an event successfully', async () => {
      const eventId = mockObjectId.toString();
      const expectedResult = { message: 'Event deleted successfully' };

      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

      const result = await controller.remove(eventId);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(eventId);
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
    });
  });
});
