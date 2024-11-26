import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { RegisterDto, LoginDto, UserResponseDto } from './dto/users.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: UserResponseDto; message: string }> {
    const { username, email, password } = registerDto;

    const userExists = await this.userModel.findOne({ email }).exec();
    if (userExists) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const userResponse: UserResponseDto = {
      username: newUser.username,
      email: newUser.email,
    };

    return {
      user: userResponse,
      message: 'User registered successfully',
    };
  }

 
}
