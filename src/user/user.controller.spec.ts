import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './create.user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockReturnValue([{ id: 1, name: 'John Doe' }]), // Mock the `findAll` method
            create: jest
              .fn()
              .mockImplementation((createUserDto: CreateUserDto) => ({
                id: 1, // Use a fixed ID (or self-increment as you need)
                name: createUserDto.name, // Return the name from the DTO
              })),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should return all users from findAll()', () => {
    const result = userController.findAll();
    expect(result).toEqual([{ id: 1, name: 'John Doe' }]);
    expect(userService.findAll).toHaveBeenCalled();
  });

  it('should create a user from create()', () => {
    const createUserDto: CreateUserDto = { name: 'Jane Doe' };
    const result = userController.create(createUserDto);
    expect(result).toEqual({ id: 1, name: 'Jane Doe' }); // The name should match the one in the DTO
    expect(userService.create).toHaveBeenCalledWith(createUserDto);
  });
});
