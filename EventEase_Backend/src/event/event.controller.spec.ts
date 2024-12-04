import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Types } from 'mongoose';

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  const mockObjectId = new Types.ObjectId();

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
    });
  });
});
