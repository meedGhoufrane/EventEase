import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { ParticipantsModule } from './participants/participants.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';


@Module({
  imports: [EventModule, ParticipantsModule,UsersModule,MongooseModule.forRoot('mongodb://localhost:27017/EventEase')],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
