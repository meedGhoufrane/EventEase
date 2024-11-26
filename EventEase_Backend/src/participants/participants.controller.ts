import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ParticipantService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from './entities/participant.entity';

@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post('create')
  async create(@Body() createParticipantDto: CreateParticipantDto): Promise<Participant> {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  async findAll(): Promise<Participant[]> {
    return this.participantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Participant> {
    return this.participantService.findOne(id);
  }

  @Put('Update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    return this.participantService.update(id, updateParticipantDto);
  }

 
}
