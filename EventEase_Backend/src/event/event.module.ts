import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './entities/event.entity';
import { Participant, ParticipantSchema } from '../participants/entities/participant.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { ParticipantModule } from '../participants/participants.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Participant.name, schema: ParticipantSchema },
    ]),
    ParticipantModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])]
})
export class EventModule {}