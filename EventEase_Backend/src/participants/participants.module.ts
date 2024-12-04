import { Module } from '@nestjs/common';
import { ParticipantController } from './participants.controller';
import { ParticipantService } from './participants.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Participant, ParticipantSchema } from './entities/participant.entity';
import { Event, EventSchema } from '../event/entities/event.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Participant.name, schema: ParticipantSchema }]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([{ name: 'Participant', schema: ParticipantSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [ParticipantController],
  providers: [ParticipantService],
  exports: [JwtModule]
})
export class ParticipantModule {}
