import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../Service/user.service';
import { JwtAuthGuard } from '../Auth/jwt.auth-guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body() body: { phone: string; password: string }) {
    return this.userService.register(body.phone, body.password);
  }

  @Post('login')
  async login(@Body() body: { phone: string; password: string }) {
    return this.userService.login(body.phone, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Returns authenticated user details
  }

  @Post('refresh')
  async refresh(@Body() body: { refresh_token: string }) {
    return this.userService.refreshToken(body.refresh_token);
  }
}
