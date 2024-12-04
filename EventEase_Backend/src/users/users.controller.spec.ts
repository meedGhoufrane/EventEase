<<<<<<< HEAD
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RegisterDto, LoginDto } from './dto/users.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUserService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: JwtAuthGuard,
          useValue: { canActivate: jest.fn().mockReturnValue(true) },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const registerDto: RegisterDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedResponse = {
        user: {
          username: 'testuser',
          email: 'test@example.com',
        },
        message: 'User registered successfully',
      };

      mockUserService.register.mockResolvedValue(expectedResponse);

      const result = await controller.register(registerDto);

      expect(service.register).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle registration errors', async () => {
      const registerDto: RegisterDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const error = new Error('Registration failed');
      mockUserService.register.mockRejectedValue(error);

      await expect(controller.register(registerDto)).rejects.toThrow(error);
    });
  });

  describe('login', () => {
    it('should successfully login a user', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedResponse = {
        user: {
          username: 'testuser',
          email: 'test@example.com',
        },
        token: 'mock-jwt-token',
      };

      mockUserService.login.mockResolvedValue(expectedResponse);

      const result = await controller.login(loginDto);

      expect(service.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle login errors', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const error = new Error('Invalid credentials');
      mockUserService.login.mockRejectedValue(error);

      await expect(controller.login(loginDto)).rejects.toThrow(error);
    });
  });

  describe('getProfile', () => {
    it('should return user profile from request object', async () => {
      const mockUser = {
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
      };

      const mockRequest = {
        user: mockUser,
      };

      const result = await controller.getProfile(mockRequest);

      expect(result).toEqual(mockUser);
    });
  });
});
=======
// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';

// describe('UsersController', () => {
//   let controller: UsersController;
//   let service: UsersService;

//   const mockUser = {
//     id: 1,
//     email: 'test@example.com',
//     name: 'Test User',
//   };

//   const mockUsersService = {
//     create: jest.fn().mockResolvedValue(mockUser),
//     findAll: jest.fn().mockResolvedValue([mockUser]),
//     findOne: jest.fn().mockResolvedValue(mockUser),
//     update: jest.fn().mockResolvedValue(mockUser),
//     remove: jest.fn().mockResolvedValue({ deleted: true }),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [
//         {
//           provide: UsersService,
//           useValue: mockUsersService,
//         },
//       ],
//     }).compile();

//     controller = module.get<UsersController>(UsersController);
//     service = module.get<UsersService>(UsersService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('create', () => {
//     it('should create a new user', async () => {
//       const createUserDto = {
//         email: 'test@example.com',
//         name: 'Test User',
//       };

//       expect(await controller.create(createUserDto)).toEqual(mockUser);
//       expect(service.create).toHaveBeenCalledWith(createUserDto);
//     });
//   });

//   describe('findAll', () => {
//     it('should return an array of users', async () => {
//       expect(await controller.findAll()).toEqual([mockUser]);
//       expect(service.findAll).toHaveBeenCalled();
//     });
//   });

//   describe('findOne', () => {
//     it('should return a single user', async () => {
//       expect(await controller.findOne('1')).toEqual(mockUser);
//       expect(service.findOne).toHaveBeenCalledWith(1);
//     });
//   });

//   describe('update', () => {
//     it('should update a user', async () => {
//       const updateUserDto = {
//         name: 'Updated Name',
//       };

//       expect(await controller.update('1', updateUserDto)).toEqual(mockUser);
//       expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
//     });
//   });

//   describe('remove', () => {
//     it('should remove a user', async () => {
//       expect(await controller.remove('1')).toEqual({ deleted: true });
//       expect(service.remove).toHaveBeenCalledWith(1);
//     });
//   });
// });
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
