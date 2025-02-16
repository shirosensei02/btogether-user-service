import { Module, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { APP_PIPE } from '@nestjs/core'; // Import APP_PIPE

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class UserModule {}
