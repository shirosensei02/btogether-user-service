import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../Service/auth.service';
import { UserService } from '../Service/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() body: { phone: string; password: string }) {
    return this.userService.register(body.phone, body.password);
  }

  @Post('login')
  async login(@Body() body: { phone: string; password: string }) {
    return this.authService.login(body.phone, body.password);
  }
}
