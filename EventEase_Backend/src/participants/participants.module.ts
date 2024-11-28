import { Module } from '@nestjs/common';
import { ParticipantController } from './participants.controller';
import { ParticipantService } from './participants.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Participant, ParticipantSchema } from './entities/participant.entity';
import { Event, EventSchema } from '../event/entities/event.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Participant.name, schema: ParticipantSchema }]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),  // Ensure Event is registered
  ],
  controllers: [ParticipantController],
  providers: [ParticipantService],
})

export class ParticipantsModule {}
  
export class ParticipantModule {}
