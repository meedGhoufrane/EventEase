import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantController } from './participants.controller';
import { ParticipantService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '../common/auth/auth.guard';

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
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({ canActivate: () => true })
    .compile();

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
        event: mockObjectId.toString(),
      };

      mockService.create.mockResolvedValue(mockParticipant);
      const result = await controller.create(createDto);
      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockParticipant);
    });

    it('should handle ConflictException', async () => {
      const createDto: CreateParticipantDto = {
        name: 'John Doe',
        email: 'john@example.com',
        cin: 'ABC123',
        event: mockObjectId.toString(),
      };

      mockService.create.mockRejectedValue(new ConflictException());
      await expect(controller.create(createDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return all participants', async () => {
      mockService.findAll.mockResolvedValue([mockParticipant]);
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockParticipant]);
    });
  });

  describe('findOne', () => {
    it('should return a participant by id', async () => {
      mockService.findOne.mockResolvedValue(mockParticipant);
      const result = await controller.findOne(mockObjectId.toString());
      expect(service.findOne).toHaveBeenCalledWith(mockObjectId.toString());
      expect(result).toEqual(mockParticipant);
    });

    it('should handle NotFoundException', async () => {
      mockService.findOne.mockRejectedValue(new NotFoundException());
      await expect(controller.findOne(mockObjectId.toString())).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a participant successfully', async () => {
      const updateDto: UpdateParticipantDto = {
        name: 'Updated Name',
      };

      const updatedParticipant = { ...mockParticipant, ...updateDto };
      mockService.update.mockResolvedValue(updatedParticipant);

      const result = await controller.update(mockObjectId.toString(), updateDto);
      expect(service.update).toHaveBeenCalledWith(mockObjectId.toString(), updateDto);
      expect(result).toEqual(updatedParticipant);
    });

    it('should handle NotFoundException during update', async () => {
      const updateDto: UpdateParticipantDto = {
        name: 'Updated Name',
      };

      mockService.update.mockRejectedValue(new NotFoundException());
      await expect(controller.update(mockObjectId.toString(), updateDto))
        .rejects.toThrow(NotFoundException);
    });
  });
});
