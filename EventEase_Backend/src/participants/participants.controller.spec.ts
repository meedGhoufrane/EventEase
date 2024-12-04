import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantController } from './participants.controller';
import { ParticipantService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
<<<<<<< HEAD
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
=======
import { Types } from 'mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0

describe('ParticipantController', () => {
  let controller: ParticipantController;
  let service: ParticipantService;

  const mockObjectId = new Types.ObjectId();

  const mockParticipant = {
    _id: mockObjectId,
    name: 'John Doe',
    email: 'john@example.com',
<<<<<<< HEAD
    cin: 'ABC123',
    event: new Types.ObjectId(),
=======
    cin: 'CIN123456',
    event: mockObjectId,
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
  };

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
<<<<<<< HEAD
    remove: jest.fn(),
=======
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantController],
      providers: [
        {
          provide: ParticipantService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ParticipantController>(ParticipantController);
    service = module.get<ParticipantService>(ParticipantService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a participant successfully', async () => {
      const createDto: CreateParticipantDto = {
        name: 'John Doe',
        email: 'john@example.com',
<<<<<<< HEAD
        cin: 'ABC123',
        event: mockObjectId.toHexString(),
=======
        cin: 'CIN123456',
        event: mockObjectId.toString(),
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
      };

      mockService.create.mockResolvedValue(mockParticipant);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockParticipant);
    });

    it('should handle ConflictException during creation', async () => {
      const createDto: CreateParticipantDto = {
        name: 'John Doe',
        email: 'john@example.com',
<<<<<<< HEAD
        cin: 'ABC123',
        event: mockObjectId.toHexString(),
=======
        cin: 'CIN123456',
        event: mockObjectId.toString(),
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
      };

      mockService.create.mockRejectedValue(new ConflictException('Email already exists'));

      await expect(controller.create(createDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
<<<<<<< HEAD
    it('should return an array of participants', async () => {
=======
    it('should return all participants', async () => {
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
      mockService.findAll.mockResolvedValue([mockParticipant]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockParticipant]);
    });
  });

  describe('findOne', () => {
<<<<<<< HEAD
    it('should return a single participant', async () => {
      const id = mockObjectId.toHexString();
=======
    it('should return a participant by ID', async () => {
      const id = mockObjectId.toString();
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
      mockService.findOne.mockResolvedValue(mockParticipant);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockParticipant);
    });
<<<<<<< HEAD

    it('should handle participant not found', async () => {
      const id = mockObjectId.toHexString();
      mockService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    });
=======
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
  });

  describe('update', () => {
    it('should update a participant successfully', async () => {
<<<<<<< HEAD
      const id = mockObjectId.toHexString();
=======
      const id = mockObjectId.toString();
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
      const updateDto: UpdateParticipantDto = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      const updatedParticipant = { ...mockParticipant, ...updateDto };
      mockService.update.mockResolvedValue(updatedParticipant);

      const result = await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(id, updateDto);
      expect(result).toEqual(updatedParticipant);
    });

<<<<<<< HEAD
    it('should handle participant not found during update', async () => {
      const id = mockObjectId.toHexString();
=======
    it('should handle NotFoundException during update', async () => {
      const id = mockObjectId.toString();
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
      const updateDto: UpdateParticipantDto = {
        name: 'Updated Name',
      };

      mockService.update.mockRejectedValue(new NotFoundException());

      await expect(controller.update(id, updateDto)).rejects.toThrow(NotFoundException);
    });
  });
<<<<<<< HEAD

  describe('remove', () => {
    it('should remove a participant successfully', async () => {
      const id = mockObjectId.toHexString();
      mockService.remove.mockResolvedValue(mockParticipant);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockParticipant);
    });

    it('should handle participant not found during removal', async () => {
      const id = mockObjectId.toHexString();
      mockService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
=======
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
});
