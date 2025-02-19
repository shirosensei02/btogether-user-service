import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../Service/user.service';
import { AuthService } from '../Service/auth.service';
import { AuthController } from '../Controller/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Store in environment variables
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
