import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Login Function
  async login(phone: string, password: string) {
    const user = await this.userService.validateUser(phone, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Generate JWT Token
    const payload = { sub: user.id, phone: user.phone };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
