// import { Test, TestingModule } from '@nestjs/testing';
// import { EventController } from './event.controller';
// import { EventService } from './event.service';
// import { CreateEventDto } from './dto/create-event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';
// import { Event } from './entities/event.entity';
// import { Types } from 'mongoose'; // Import Types for ObjectId

// describe('EventController', () => {
//   let controller: EventController;
//   let service: EventService;

//   const mockObjectId = new Types.ObjectId(); // Mock ObjectId for event and participants

//   // Mock event data
//   const mockEvent: Partial<Event> = {
//     _id: mockObjectId,
//     name: 'Sample Event',
//     description: 'This is a sample event',
//     date: new Date(),
//     location: 'Sample Location',
//     participants: [mockObjectId], // Correctly pass ObjectId here
//     maxParticipants: 100,
//   };

//   const mockService = {
//     create: jest.fn().mockResolvedValue(mockEvent),
//     findAll: jest.fn().mockResolvedValue([mockEvent]),
//     findOne: jest.fn().mockResolvedValue(mockEvent),
//     update: jest.fn().mockResolvedValue({ ...mockEvent, name: 'Updated Event' }),
//     remove: jest.fn().mockResolvedValue(mockEvent),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [EventController],
//       providers: [
//         {
//           provide: EventService,
//           useValue: mockService,
//         },
//       ],
//     }).compile();

//     controller = module.get<EventController>(EventController);
//     service = module.get<EventService>(EventService);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//     expect(service).toBeDefined();
//   });

//   describe('create', () => {
//     it('should create a new event', async () => {
//       const createDto: CreateEventDto = {
//         name: 'Sample Event',
//         description: 'This is a sample event',
//         date: new Date(),
//         location: 'Sample Location',
//         participants: [mockObjectId], // Correctly pass ObjectId
//       };

//       const result = await controller.create(createDto);

//       expect(service.create).toHaveBeenCalledWith(createDto);
//       expect(result).toEqual(mockEvent);
//     });
//   });

//   describe('findAll', () => {
//     it('should return all events', async () => {
//       const result = await controller.findAll();

//       expect(service.findAll).toHaveBeenCalled();
//       expect(result).toEqual([mockEvent]);
//     });
//   });

//   describe('findOne', () => {
//     it('should return an event by ID', async () => {
//       const id = mockObjectId.toHexString();

//       const result = await controller.findOne(id);

//       expect(service.findOne).toHaveBeenCalledWith(id);
//       expect(result).toEqual(mockEvent);
//     });
//   });

//   describe('update', () => {
//     it('should update an event by ID', async () => {
//       const id = mockObjectId.toHexString();
//       const updateDto: UpdateEventDto = {
//         name: 'Updated Event',
//         description: 'This is the updated event',
//         date: new Date(),
//         location: 'Updated Location',
//         participants: [mockObjectId], // Correctly pass ObjectId
//         maxParticipants: 150,
//       };

//       const result = await controller.update(id, updateDto);

//       expect(service.update).toHaveBeenCalledWith(id, updateDto);
//       expect(result).toEqual({ ...mockEvent, name: 'Updated Event' });
//     });
//   });

//   describe('remove', () => {
//     it('should delete an event by ID', async () => {
//       const id = mockObjectId.toHexString();

//       const result = await controller.remove(id);

//       expect(service.remove).toHaveBeenCalledWith(id);
//       expect(result).toEqual(mockEvent);
//     });
//   });
// });
