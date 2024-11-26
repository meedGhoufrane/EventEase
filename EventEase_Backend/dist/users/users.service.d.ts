import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { RegisterDto, UserResponseDto } from './dto/users.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        user: UserResponseDto;
        message: string;
    }>;
}
