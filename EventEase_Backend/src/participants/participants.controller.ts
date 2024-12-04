import { Controller, Get, Post, Body, Param, Put, Delete, ConflictException, NotFoundException, UseGuards } from '@nestjs/common';
import { ParticipantService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from './entities/participant.entity';
import { JwtAuthGuard } from '../common/auth/auth.guard';


@Controller('participants')
@UseGuards(JwtAuthGuard) 

export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}
  
  @Post('create')
  async create(@Body() createParticipantDto: CreateParticipantDto): Promise<Participant> {
    try {
      return await this.participantService.create(createParticipantDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error; 
      }
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<Participant[]> {
    return this.participantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Participant> {
    return this.participantService.findOne(id);
  }

  @Put('update/:id') 
  async update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    try {
      return await this.participantService.update(id, updateParticipantDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Participant with ID "${id}" not found`);
      }
      throw error;
    }
  }


}
