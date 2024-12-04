import { IsString, IsNotEmpty, IsEmail, IsMongoId } from 'class-validator';

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

  @IsMongoId()
  @IsNotEmpty()
  event: string;
}
