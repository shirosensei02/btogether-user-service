import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create.user.dto';
import { User } from './user.interface'; // Import the User interface

@Injectable()
export class UserService {
  private readonly users: User[] = []; // Specify the array type as User[]
  private userId = 1; // Start ID from 1 and increment with each new user

  findAll() {
    return this.users;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = { id: this.userId++, name: createUserDto.name }; // Type-safe user creation
    this.users.push(newUser);
    return newUser;
  }
}
