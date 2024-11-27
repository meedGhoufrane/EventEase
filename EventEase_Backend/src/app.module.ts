import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { ParticipantModule } from './participants/participants.module';  
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EventModule, 
    ParticipantModule,  
    UsersModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    DatabaseConfig
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
