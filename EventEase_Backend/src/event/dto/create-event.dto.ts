import { IsString, IsOptional, IsArray, IsDate } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsDate()
  date: Date;

  @IsString()
  location: string;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  participants?: string[];
  
}
