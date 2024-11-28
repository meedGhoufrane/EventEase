import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateParticipantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  cin: string; 

  @IsString()
  @IsNotEmpty()
  event: string;
}
