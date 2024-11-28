// import { Test, TestingModule } from '@nestjs/testing';
// import { ParticipantController } from './participants.controller';
// import { ParticipantService } from './participants.service';
// import { CreateParticipantDto } from './dto/create-participant.dto';
// import { UpdateParticipantDto } from './dto/update-participant.dto';
// import { Participant } from './entities/participant.entity';
// import { Types } from 'mongoose'; // Import Types for ObjectId

// describe('ParticipantController', () => {
//   let controller: ParticipantController;
//   let service: ParticipantService;

//   const mockObjectId = new Types.ObjectId(); // Simulate an ObjectId

//   // Mock participant with _id included
//   const mockParticipant: Participant = {
//     // _id: mockObjectId, // Mock _id as ObjectId
//     name: 'John Doe',
//     email: 'john@example.com',
//     event: mockObjectId, // Use ObjectId for event
//   };

//   const mockService = {
//     create: jest.fn().mockResolvedValue(mockParticipant),
//     findAll: jest.fn().mockResolvedValue([mockParticipant]),
//     findOne: jest.fn().mockResolvedValue(mockParticipant),
//     update: jest.fn().mockResolvedValue({
//       ...mockParticipant,
//       name: 'Updated Name',
//     }),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ParticipantController],
//       providers: [
//         {
//           provide: ParticipantService,
//           useValue: mockService,
//         },
//       ],
//     }).compile();

//     controller = module.get<ParticipantController>(ParticipantController);
//     service = module.get<ParticipantService>(ParticipantService);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//     expect(service).toBeDefined();
//   });

//   describe('create', () => {
//     it('should create a participant', async () => {
//       const createDto: CreateParticipantDto = {
//         name: 'John Doe',
//         email: 'john@example.com',
//         event: mockObjectId.toHexString(), // Pass a valid ObjectId string
//       };

//       const result = await controller.create(createDto);

//       expect(service.create).toHaveBeenCalledWith(createDto);
//       expect(result).toEqual(mockParticipant);
//     });
//   });

//   describe('findAll', () => {
//     it('should return all participants', async () => {
//       const result = await controller.findAll();

//       expect(service.findAll).toHaveBeenCalled();
//       expect(result).toEqual([mockParticipant]);
//     });
//   });

//   describe('findOne', () => {
//     it('should return a participant by ID', async () => {
//       const id = mockObjectId.toHexString();

//       const result = await controller.findOne(id);

//       expect(service.findOne).toHaveBeenCalledWith(id);
//       expect(result).toEqual(mockParticipant);
//     });
//   });

//   describe('update', () => {
//     it('should update a participant by ID', async () => {
//       const id = mockObjectId.toHexString();
//       const updateDto: UpdateParticipantDto = {
//         name: 'Updated Name',
//         email: 'john@example.com',
//         event: mockObjectId.toHexString(),
//       };

//       const result = await controller.update(id, updateDto);

//       expect(service.update).toHaveBeenCalledWith(id, updateDto);
//       expect(result).toEqual({
//         ...mockParticipant,
//         name: 'Updated Name',
//       });
//     });
//   });
// });
