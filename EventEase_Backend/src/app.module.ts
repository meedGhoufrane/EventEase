import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { ParticipantModule } from './participants/participants.module';  
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './common/auth/auth.guard';

@Module({
  imports: [
    EventModule, 
    ParticipantModule,  
    UsersModule, 
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    DatabaseConfig
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AppModule {}
