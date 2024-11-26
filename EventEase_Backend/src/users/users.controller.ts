import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, RegisterDto } from './dto/users.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }
}
