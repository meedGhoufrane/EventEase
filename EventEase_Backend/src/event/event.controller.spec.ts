import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '../common/auth/auth.guard';

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
    getEventById: jest.fn(),
    addParticipants: jest.fn()
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
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({ canActivate: () => true })
    .compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
  });

  describe('findAll', () => {
    it('should return all events', async () => {
      mockService.findAll.mockResolvedValue([mockEvent]);
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockEvent]);
    });
  });

  describe('getEventById', () => {
    it('should return event and its participants', async () => {
      const mockEventWithParticipants = {
        event: mockEvent,
        participants: []
      };
      mockService.getEventById.mockResolvedValue(mockEventWithParticipants);
      
      const result = await service.getEventById(mockObjectId.toString());
      expect(result).toEqual(mockEventWithParticipants);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const updateDto: UpdateEventDto = {
        name: 'Updated Event'
      };
      const expectedResponse = {
        event: { ...mockEvent, ...updateDto },
        message: 'Event updated successfully'
      };

      mockService.update.mockResolvedValue(expectedResponse);
      const result = await controller.update(mockObjectId.toString(), updateDto);
      expect(service.update).toHaveBeenCalledWith(mockObjectId.toString(), updateDto);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('addParticipants', () => {
    it('should add participants to an event', async () => {
      const participantIds = [new Types.ObjectId().toString()];
      mockService.addParticipants.mockResolvedValue(mockEvent);
      
      const result = await service.addParticipants(mockObjectId.toString(), participantIds);
      expect(result).toEqual(mockEvent);
    });
  });
});