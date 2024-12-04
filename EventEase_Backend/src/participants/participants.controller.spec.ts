import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantController } from './participants.controller';
import { ParticipantService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

describe('ParticipantController', () => {
  let controller: ParticipantController;
  let service: ParticipantService;

  const mockObjectId = new Types.ObjectId();

  const mockParticipant = {
    _id: mockObjectId,
    name: 'John Doe',
    email: 'john@example.com',
    cin: 'ABC123',
    event: new Types.ObjectId(),
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
        cin: 'ABC123',
        event: mockObjectId.toHexString(),
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
        cin: 'ABC123',
        event: mockObjectId.toHexString(),
      };

      mockService.create.mockRejectedValue(new ConflictException('Email already exists'));

      await expect(controller.create(createDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of participants', async () => {
      mockService.findAll.mockResolvedValue([mockParticipant]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockParticipant]);
    });
  });

  describe('findOne', () => {
    it('should return a single participant', async () => {
      const id = mockObjectId.toHexString();
      mockService.findOne.mockResolvedValue(mockParticipant);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockParticipant);
    });

    it('should handle participant not found', async () => {
      const id = mockObjectId.toHexString();
      mockService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a participant successfully', async () => {
      const id = mockObjectId.toHexString();
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

    it('should handle participant not found during update', async () => {
      const id = mockObjectId.toHexString();
      const updateDto: UpdateParticipantDto = {
        name: 'Updated Name',
      };

      mockService.update.mockRejectedValue(new NotFoundException());

      await expect(controller.update(id, updateDto)).rejects.toThrow(NotFoundException);
    });
  });

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
});
