import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../Service/user.service';
import { UserController } from '../Controller/user.controller';
import { JwtAuthGuard } from '../Auth/jwt.auth-guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Store in environment variables
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService, JwtAuthGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
