import { UsersService } from './users.service';
import { LoginDto, RegisterDto } from './dto/users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(registerDto: RegisterDto): Promise<{
        user: import("./dto/users.dto").UserResponseDto;
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: import("./dto/users.dto").UserResponseDto;
        token: string;
    }>;
}
