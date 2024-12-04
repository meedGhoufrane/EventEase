import { Controller, Get, Post, Body, Param, Patch, Delete, BadRequestException,Req, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../common/auth/auth.guard';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post("create")
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  
  @Get(':id')
  async findOne(@Param() params: any, @Req() req: any) {
    // console.log('Full Params:', params);
    // console.log('Request Params:', req.params);
    // console.log('Received ID:', params.id);
  
    const id = params.id;
  
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ObjectId format.');
    }
    return this.eventService.getEventById(id);
  }
  


  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }


  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }

  @Get(':id/details')
  async getEventById(@Param('id') id: string) {
    return this.eventService.getEventById(id);
  }

  @Post(':id/participants')
  async addParticipants(
    @Param('id') id: string,
    @Body() { participants }: { participants: string[] }
  ) {
    return this.eventService.addParticipants(id, participants);
  }
}
