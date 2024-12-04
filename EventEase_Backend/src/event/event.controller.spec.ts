import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  const mockObjectId = new Types.ObjectId();

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
    });
  });
});
