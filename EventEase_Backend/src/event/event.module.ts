import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './entities/event.entity';
import { Participant, ParticipantSchema } from '../participants/entities/participant.entity'; // Import Participant
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Participant.name, schema: ParticipantSchema },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])] // Export EventModel
})
export class EventModule {}
