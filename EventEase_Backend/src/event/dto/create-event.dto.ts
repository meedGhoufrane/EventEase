import { IsArray, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  date: Date;

  @IsString()
  location: string;

  @IsArray()
  @IsMongoId({ each: true })
  participants: Types.ObjectId[];  // Ensure participants are typed correctly as ObjectId[]

  @IsString()
  maxParticipants: number;
}
