import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantService } from './participants.service';
import { getModelToken } from '@nestjs/mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

describe('ParticipantService', () => {
  let service: ParticipantService;
  let mockParticipantModel: any;
  let mockEventModel: any;

  const mockObjectId = new Types.ObjectId();

  beforeEach(async () => {
    mockParticipantModel = {
      findOne: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      save: jest.fn(),
      populate: jest.fn(),
      exec: jest.fn(),
    };

    mockEventModel = {
      findById: jest.fn(),
      save: jest.fn(),
      exec: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipantService,
        {
          provide: getModelToken('Participant'),
          useValue: mockParticipantModel,
        },
        {
          provide: getModelToken('Event'),
          useValue: mockEventModel,
        },
      ],
    }).compile();

    service = module.get<ParticipantService>(ParticipantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDto: CreateParticipantDto = {
      name: 'John Doe',
      email: 'john@example.com',
      cin: 'CIN123456',
      event: mockObjectId.toString(),
    };

    it('should create a participant successfully', async () => {
      const savedParticipant = {
        _id: mockObjectId,
        ...createDto,
        populate: jest.fn().mockResolvedValue({ ...createDto, _id: mockObjectId }),
      };

      mockParticipantModel.findOne = jest.fn().mockResolvedValue(null);
      mockParticipantModel.prototype.save = jest.fn().mockResolvedValue(savedParticipant);
      mockEventModel.findById = jest.fn().mockResolvedValue({
        participants: [],
        save: jest.fn().mockResolvedValue(true),
      });

      const result = await service.create(createDto);
      expect(result).toBeDefined();
      //@ts-ignore
      expect(result._id).toEqual(mockObjectId);
    });

    it('should throw ConflictException if email already exists', async () => {
      mockParticipantModel.findOne = jest.fn().mockResolvedValue({
        email: createDto.email,
      });

      await expect(service.create(createDto)).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException if event not found', async () => {
      mockParticipantModel.findOne = jest.fn().mockResolvedValue(null);
      mockEventModel.findById = jest.fn().mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all participants', async () => {
      const mockParticipants = [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Doe', email: 'jane@example.com' },
      ];

      mockParticipantModel.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockParticipants),
      });

      const result = await service.findAll();
      expect(result).toEqual(mockParticipants);
    });
  });

  describe('findOne', () => {
    it('should return a participant by id', async () => {
      const mockParticipant = {
        _id: mockObjectId,
        name: 'John Doe',
        email: 'john@example.com',
      };

      mockParticipantModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockParticipant),
        }),
      });

      const result = await service.findOne(mockObjectId.toString());
      expect(result).toEqual(mockParticipant);
    });

    it('should throw NotFoundException if participant not found', async () => {
      mockParticipantModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      await expect(service.findOne(mockObjectId.toString()))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateDto: UpdateParticipantDto = {
      name: 'Updated Name',
      email: 'updated@example.com',
    };

    it('should update a participant successfully', async () => {
      const existingParticipant = {
        _id: mockObjectId,
        event: mockObjectId,
      };

      const updatedParticipant = {
        _id: mockObjectId,
        ...updateDto,
      };

      mockParticipantModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(existingParticipant),
      });

      mockParticipantModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(updatedParticipant),
        }),
      });

      const result = await service.update(mockObjectId.toString(), updateDto);
      expect(result).toEqual(updatedParticipant);
    });

    it('should throw NotFoundException if participant not found', async () => {
      mockParticipantModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.update(mockObjectId.toString(), updateDto))
        .rejects.toThrow(NotFoundException);
    });
  });
});
