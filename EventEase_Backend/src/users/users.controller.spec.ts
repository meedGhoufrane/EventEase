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
