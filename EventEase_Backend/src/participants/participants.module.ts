import { Module } from '@nestjs/common';
import { ParticipantService } from './participants.service';
import { ParticipantController } from './participants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Participant, ParticipantSchema } from './entities/participant.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Participant.name, schema: ParticipantSchema }])],
  controllers: [ParticipantController],
  providers: [ParticipantService],
  exports: [ParticipantService],  
})
export class ParticipantModule {}  
