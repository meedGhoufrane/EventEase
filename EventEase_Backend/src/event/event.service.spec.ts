// import { Test, TestingModule } from '@nestjs/testing';
// import { EventService } from './event.service';
// import { getModelToken } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Event } from './entities/event.entity';
// import { Participant } from '../participants/entities/participant.entity';
// import { NotFoundException } from '@nestjs/common';

// describe('EventService', () => {
//   let service: EventService;
//   let eventModel: Model<Event>;
//   let participantModel: Model<Participant>;

//   const mockEventModel = {
//     create: jest.fn(),
//     findById: jest.fn(),
//     findByIdAndUpdate: jest.fn(),
//   };

//   const mockParticipantModel = {
//     find: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         EventService,
//         {
//           provide: getModelToken(Event.name),
//           useValue: mockEventModel,
//         },
//         {
//           provide: getModelToken(Participant.name),
//           useValue: mockParticipantModel,
//         },
//       ],
//     }).compile();

//     service = module.get<EventService>(EventService);
//     eventModel = module.get<Model<Event>>(getModelToken(Event.name));
//     participantModel = module.get<Model<Participant>>(getModelToken(Participant.name));
//   });

//   afterEach(() => {
//     jest.clearAllMocks(); 
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('create', () => {
//     const createEventDto = {
//       name: 'Test Event',
//       description: 'Test Event Description',
//       participants: ['64b8b7f4c56a460015f9b5d8'],// Example ObjectId
//     };

//     const mockEvent = {
//       _id: '64b8b7f4c56a460015f9b5d9',
//       ...createEventDto,
//     };

//     it('should create an event without participants', async () => {
//       mockEventModel.create.mockResolvedValue(mockEvent);

//       const result = await service.create({ name: 'Test Event' });
//       expect(result).toEqual(mockEvent);
//       expect(mockEventModel.create).toHaveBeenCalledWith({ name: 'Test Event' });
//     });

//     it('should throw an error if participants are invalid', async () => {
//       const invalidParticipants = ['invalid-id'];

//       mockParticipantModel.find.mockResolvedValue([]); // No matching participants

//       await expect(
//         service.create({ ...createEventDto, participants: invalidParticipants }),
//       ).rejects.toThrow(NotFoundException);

//       expect(mockParticipantModel.find).toHaveBeenCalledWith({
//         _id: { $in: invalidParticipants },
//       });
//     });

//     it('should create an event with valid participants', async () => {
//       const validParticipants = ['64b8b7f4c56a460015f9b5d8'];

//       mockParticipantModel.find.mockResolvedValue(validParticipants); // Simulate matching participants
//       mockEventModel.create.mockResolvedValue(mockEvent);

//       const result = await service.create({
//         ...createEventDto,
//         participants: validParticipants,
//       });

//       expect(result).toEqual(mockEvent);
//       expect(mockParticipantModel.find).toHaveBeenCalledWith({
//         _id: { $in: validParticipants },
//       });
//       expect(mockEventModel.create).toHaveBeenCalledWith({
//         ...createEventDto,
//       });
//     });
//   });
// });
