import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from "../Entity/user.entity"

@Injectable()
export class UserService {
  private users: User[] = {
    id: 1,
    phone: '+6512345678',
    password: 'adminpassword',
    role: 'admin',
  }; // Admin user  Simulating a database (Replace with real DB later)
  private idCounter = 1;

  constructor(private jwtService: JwtService) {}

  // User Registration
  async register(phone: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: this.idCounter++, phone, password: hashedPassword };
    this.users.push(newUser);
    return { id: newUser.id, phone: newUser.phone };
  }

  // Find User by Phone
  findByPhone(phone: string) {
    return this.users.find((user) => user.phone === phone);
  }

  // Validate User Credentials
  async validateUser(phone: string, password: string) {
    const user = this.findByPhone(phone);
    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user.id, phone: user.phone }; // Return user details without password
    }
    return null;
  }

  // Generate JWT Token
  async login(phone: string, password: string) {
    const user = this.users.find(
      (u) => u.phone === phone && u.password === password,
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, phone: user.phone, role: user.role }; // Include role
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(refresh_token: string) {
    try {
      const decoded = this.jwtService.verify(refresh_token);
      const newAccessToken = this.jwtService.sign(
        { sub: decoded.sub, phone: decoded.phone },
        { expiresIn: '15m' },
      );
      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
